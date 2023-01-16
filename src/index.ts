import dotenv from "dotenv";
import Logger from "./v1/utils/logger";
import { App } from "./app";
dotenv.config();

try {
    const app = new App();
    const { server, io } = app.listen();
    server.on("listening", () => {
        /**
         * Event listener for HTTP server "listening" event.
         */
        const addr = server.address();
        const bind =
            typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;

        Logger.info(`Listening on ${bind}`);

        io.on("connection", (socket) => {
            Logger.info(`Socket connected: ${socket.id}`);
            socket.on("chat message", (msg: string) => {
                io.emit("chat message", msg);
            });
            socket.emit("chat message", "Hello from the server");

            socket.on("disconnect", () => {
                Logger.info(`Socket disconnected: ${socket.id}`);
            });
        });

        process.on("SIGINT", () => {
            Logger.info("SIGINT signal received: closing HTTP server");
            server.close(() => {
                Logger.info("HTTP server closed");
            });
        });
    });
} catch (error) {
    Logger.error(error);
}
