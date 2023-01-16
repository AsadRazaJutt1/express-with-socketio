import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send({
        message: `Welcome to the ${process.env.APP_NAME} API`,
    });
});
