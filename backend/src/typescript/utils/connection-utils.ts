import { Connection } from "../types/connection";

const handle = (f, connectionContext: Connection.ConnectionContext) => {
    return (data) => {
        if (data) {
            f({ connectionContext, data });
        } else {
            f(connectionContext);
        }
    };
};

export { handle };
