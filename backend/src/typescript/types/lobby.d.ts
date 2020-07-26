import { Users } from "./user";

declare namespace Lobby {
    export interface LobbyState {
        users: {
            [key: string]: Users.User;
        };
        totalUsers: number;
    }
}
