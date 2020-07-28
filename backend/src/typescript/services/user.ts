import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const lobbyState: Lobby.LobbyState = {
    users: {},
    totalUsers: 0
};

const connectNewUser = (user: Users.UserConnection) => {
    let {
        connectionContext: { socket },
        data: { userName }
    } = user;
    let userObject = generateUserObject(userName);
    let token = jwt.sign(userObject, "SECRET");

    lobbyState.users[token] = userObject;
    lobbyState.totalUsers = getAllUsers().length;
    console.log(lobbyState);
    socket.emit("user", { user: userObject, token });
    socket.emit("lobby-state", lobbyState);
    socket.broadcast.emit("lobby-state", lobbyState);
};

const connectExistingUser = ({
    data: { token },
    connectionContext: { socket }
}) => {
    let payload = null;
    try {
        payload = jwt.verify(token, "SECRET");
    } catch (err) {
        console.error(err);
    }
    if (payload) {
        // console.log("PAYLOAD", payload);
        let user = getUserByToken(token);
        console.log("USER", user);
        if (user) {
            socket.emit("user", { user, token });
        }
    }
    // const user = getUserByToken(token);
};

const generateUserObject = (userName: string): Users.User => {
    let key = null;
    do {
        let prospectiveKey = nanoid(4);
        let allUsers = getAllUsers();
        let sameKey = allUsers.find((user: Users.User) => {
            return user.key === prospectiveKey && user.userName === userName;
        });
        if (!sameKey) {
            key = prospectiveKey;
        }
    } while (key == null);
    return { userName: userName, key };
};

const getUserByToken = (token: string): Users.User => {
    return lobbyState.users[token];
};

const removeUser = (socketID: string): boolean => {
    const user = lobbyState.users[socketID];
    if (user) {
        delete lobbyState.users[socketID];
        return true;
    } else {
        return false;
    }
};

const getAllUsers = () => {
    return Object.values(lobbyState.users);
};

const getLobbyState = (): Lobby.LobbyState => {
    return lobbyState;
};

export {
    connectNewUser,
    connectExistingUser,
    getUserByToken,
    removeUser,
    getAllUsers,
    getLobbyState
};
