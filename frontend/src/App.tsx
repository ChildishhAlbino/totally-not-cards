import React, { useState, useRef } from "react";
import jwt from "jsonwebtoken";

import "./App.css";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000");

interface User {
    key: string;
    userName: string;
}

interface UserResponse {
    user: User;
    token: string;
}

interface LobbyState {
    users: {
        [key: string]: User;
    };
    totalUsers: number;
}

function App() {
    let [user, setUser] = useState<User | null>(null);
    let reference = useRef<HTMLInputElement>(null);
    let [lobbyState, setLobbyState] = useState<LobbyState>({
        users: {},
        totalUsers: 0
    });

    let token = localStorage.getItem("token");
    if (token && !user) {
        try {
            let prospectivePayload = jwt.verify(token, "SECRET");
            console.log(prospectivePayload);
            socket.emit("user-rejoins-lobby", { token });
        } catch (err) {
            console.error(err);
        }
    }

    socket.on("user", ({ user, token }: UserResponse) => {
        localStorage.setItem("token", token);
        setUser(user);
    });

    socket.on("lobby-state", (data: LobbyState) => {
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
