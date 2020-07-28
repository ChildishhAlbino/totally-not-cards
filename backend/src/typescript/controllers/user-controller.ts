import {
    connectNewUser,
    connectExistingUser,
    getAllUsers,
    getUserByToken,
    removeUser,
    getLobbyState
} from "../services/user";

import { handle } from "../utils/connection-utils";

const load = async (connectionContext: Connection.ConnectionContext) => {
    const { socket } = connectionContext;
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
    return connectionContext;
};

export { load };
