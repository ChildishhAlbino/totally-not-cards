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

let port = process.env.PORT || 4000;

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});
