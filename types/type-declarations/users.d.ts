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
}
