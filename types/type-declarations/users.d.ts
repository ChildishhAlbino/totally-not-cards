declare namespace Users {
    export interface UserConnection {
        connectionContext: Connection.ConnectionContext;
        data: {
            userName: string;
        };
    }

    export interface User {
        userName: string;
        key: string;
    }

    export interface Test {
        test: String;
        num: String;
        blah: String;
        last: number;
        sorryNotLast: String;
    }
}
