import React, { useState, useRef } from "react";
import jwt from "jsonwebtoken";

import "./App.css";

import openSocket from "socket.io-client";
// import { LobbyState, User } from "totally-not-cards";
console.log(process.env.REACT_APP_BACKEND_URL);
const url: string =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
const socket = openSocket("http://localhost:4000");

function App() {
    let [user, setUser] = useState<Users.User | null>(null);
    let reference = useRef<HTMLInputElement>(null);
    let [lobbyState, setLobbyState] = useState<Lobby.LobbyState>({
        users: {},
        totalUsers: 0
    });

    socket.on(
        "token-check",
        ({
            connection,
            token
        }: {
            connection: boolean;
            token: string | null;
        }) => {
            console.log(connection);
            token = localStorage.getItem("token");
            console.log({ token, user });
            if (token && !user) {
                try {
                    let prospectivePayload = jwt.verify(token, "SECRET");
                    console.log(prospectivePayload);
                    socket.emit("user-rejoins-lobby", { token });
                } catch (err) {
                    console.error(err);
                }
            }
        }
    );

    socket.on("user", ({ user, token }: Frontend.UserResponse) => {
        localStorage.setItem("token", token);
        setUser(user);
    });

    socket.on("lobby-state", (data: Lobby.LobbyState) => {
        setLobbyState(data);
    });

    let userNameComponent = () => {
        return (
            <div>
                <input
                    ref={reference}
                    type="text"
                    placeholder="Enter your name here. "
                />
                <button
                    onClick={() => {
                        if (reference.current) {
                            const name = reference.current.value;
                            socket.emit("user-join-lobby", { userName: name });
                            reference.current.value = "";
                        }
                    }}
                >
                    Ok
                </button>
            </div>
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                {user ? (
                    <p>
                        Username:{" "}
                        <i>
                            {user.userName} #{user.key}
                        </i>
                    </p>
                ) : (
                    userNameComponent()
                )}
                {lobbyState ? (
                    <div>
                        <ul>
                            <p>Players online:</p>
                            {Object.values(lobbyState.users).map(
                                ({ key, userName }) => {
                                    return (
                                        <li key={key + userName}>{userName}</li>
                                    );
                                }
                            )}
                        </ul>
                        <p>Total Users: {lobbyState.totalUsers}</p>
                    </div>
                ) : null}
            </header>
        </div>
    );
}

export default App;
