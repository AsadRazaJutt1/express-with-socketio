import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import { Server as HttpServer, createServer } from "http";
import { Server as IoServer } from "socket.io";
import { HttpStatusCode } from "./v1/utils/constants";
import { Config } from "./v1/utils/config";

export class App {
    public app: express.Application;
    public httpServer: HttpServer = {} as HttpServer;
    public ioServer: IoServer = {} as IoServer;
    constructor() {
        this.app = express();

        this.app.use(
            cors({
                origin: "*",
            })
        );

        this.app.use(compression());

        this.app.use(express.json({ limit: "10kb" }));
        this.app.use(express.static(`./v1/storage/app/public`));

        // support parsing of application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: true }));

        this.app.get("/api/v1/", (req: Request, res: Response) => {
            res.send({
                message: `Welcome to the ${process.env.APP_NAME} API`,
            });
        });

        this.app.all("*", (req: Request, res: Response) => {
            const {
                HTTP_NOT_FOUND: { code, message },
            } = HttpStatusCode;
            res.status(code).send({ message });
        });

        this.httpServer = createServer(this.app);
        this.ioServer = new IoServer(this.httpServer, {
            cors: {
                origin: "*",
            },
        });
    }

    public listen(): { server: HttpServer; io: IoServer } {
        const PORT = Config.port;
        const server = this.httpServer.listen(PORT);
        server.on("error", (error: any) => {
            console.log(`www - ${error}`);
            if (error.syscall !== "listen") throw error;

            switch (error.code) {
                case "EACCES":
                    console.error(`Port ${PORT} requires elevated privileges`);
                    process.exit(1);
                case "EADDRINUSE":
                    console.error(`Port ${PORT} is already in use`);
                    process.exit(1);
                default:
                    console.log(`Port ${PORT} is already in use`);
                    throw error;
            }
        });
        const io = this.ioServer;
        return { server, io };
    }
}
