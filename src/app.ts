import { HttpStatusCode } from "./v1/utils/constants";
import express, {
    Request,
    Response,
    json,
    static as expressStatic,
    urlencoded,
} from "express";
import cors from "cors";
import compression from "compression";
import { Server as HttpServer, createServer } from "http";
import { Server as IoServer } from "socket.io";
import { Config } from "./v1/utils/config";
import { join as pathJoin } from "path";
import { router as apiRouter } from "./v1/routes";

interface IAppListen {
    server: HttpServer;
    io: IoServer;
}

export class App {
    public app: express.Application;
    public httpServer: HttpServer;
    public ioServer: IoServer;
    constructor() {
        this.app = express()
            .use(cors())
            .use(json({ limit: "10kb" }))
            .use(compression())
            .use(expressStatic(pathJoin(`${__dirname}/../public`)))
            .use(urlencoded({ extended: true }))
            .use("/v1", apiRouter)
            .all("/", (req: Request, res: Response) => {
                const {
                    HTTP_NOT_FOUND: { code, message },
                } = HttpStatusCode;
                res.status(code).send({
                    message: `This Route Is ${message}`,
                });
            });

        this.httpServer = createServer(this.app);
        this.ioServer = new IoServer(this.httpServer);
    }

    public listen(): IAppListen {
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
