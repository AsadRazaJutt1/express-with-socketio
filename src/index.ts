import Logger from "./v1/utils/logger";
import { App } from "./app";

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

        process.on("SIGINT", () => {
            Logger.info("SIGINT signal received: closing HTTP server");
            server.close(() => {
                Logger.info("HTTP server closed");
            });
        });
    });

    io.on("connection", (socket) => {
        Logger.info("Client connected id " + socket.id);
        socket.on("disconnect", (socket) => {
            Logger.info("Client " + socket);
        });
    });
} catch (error) {
    Logger.error(error);
}
