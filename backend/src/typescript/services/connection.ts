import {
    connectNewUser,
    connectExistingUser,
    getAllUsers,
    getUserByToken,
    removeUser,
    getLobbyState
} from "./user";
import { handle } from "../utils/connection-utils";

// handler for a new Socket connection.
const handleConnection = (connectionContext: Connection.ConnectionContext) => {
    let { socket } = connectionContext;
    let test: Users.Test;
    console.log(getLobbyState());
    console.log("PRE TOKEN CHECK");
    socket.emit("token-check", { connection: true, token: null });
    console.log("POST TOKEN CHECK");
    socket.emit("lobby-state", getLobbyState());
    // new connection, setup all socket pathways
    // USER JOINS LOBBY
    socket.on("user-join-lobby", handle(connectNewUser, connectionContext));
    // USER REJOINS LOBBY
    socket.on(
        "user-rejoins-lobby",
        handle(connectExistingUser, connectionContext)
    );
    // USER CHANGES NAME
    // USER CREATES ROOM
    // USER JOINS ROOM
    // USER LEAVES ROOM
    // USER CHANGES ROOM NAME
};

export { handleConnection };
