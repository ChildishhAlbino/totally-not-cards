import {
    connectNewUser,
    connectExistingUser,
    getAllUsers,
    getUserByToken,
    removeUser,
    getLobbyState
} from "../services/user";

const load = async (connectionContext: Connection.ConnectionContext) => {
    const { socket } = connectionContext;
    socket.emit("token-check", { connection: true, token: null });
    socket.emit("lobby-state", getLobbyState());
    // new connection, setup all socket pathways

    return connectionContext;
};

export { load };
