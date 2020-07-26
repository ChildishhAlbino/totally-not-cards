import { Socket } from "socket.io";

declare namespace Connection {
    export interface ConnectionContext {
        socket: SocketIO.Socket;
        io: SocketIO.Server;
    }

    export interface SocketDisconnection {
        connectionContext: ConnectionContext;
        data?: String | object;
    }
}
