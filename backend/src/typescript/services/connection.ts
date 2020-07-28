import { load as loadConnectionController } from "../controllers/connection-controller";
import { load as loadUserController } from "../controllers/user-controller";

// handler for a new Socket connection.
const handleConnection = async (
    connectionContext: Connection.ConnectionContext
) => {
    const controllers = [
        loadConnectionController(connectionContext),
        loadUserController(connectionContext)
    ];
    await Promise.all(controllers);
    console.log("All controllers setup.");
};

export { handleConnection };
