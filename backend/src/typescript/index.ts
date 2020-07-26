import express, { Application } from "express";
import { createServer } from "http";
import SocketIO from "socket.io";
import { handleConnection } from "./services/connection";

const app: Application = express();
const http = createServer(app);
const io = SocketIO(http);

io.on("connection", (socket: SocketIO.Socket) => {
    return handleConnection({ socket, io });
});

http.listen(4000, "0.0.0.0", () => {
    console.log("HELLo");
    console.log("listening on *:4000");
});
