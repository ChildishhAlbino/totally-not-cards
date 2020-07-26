// var app = require("express")();
// var http = require("http").createServer(app);
// var io = require("socket.io")(http);

import express, { Application, Request, Response, NextFunction } from "express";
import { createServer } from "http";
import SocketIO from "socket.io";
import { handleConnection } from "./services/connection";

const app: Application = express();
const http = createServer(app);
const io = SocketIO(http);

io.on("connection", (socket: SocketIO.Socket) => {
    return handleConnection({ socket, io });
});

http.listen(4000, () => {
    console.log("listening on *:3000");
});
