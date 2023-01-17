import { Router, Request, Response } from "express";

const router = Router();

console.log("Admin API");

router.get("/", (req: Request, res: Response) => {
    res.send({
        message: `Admin API`,
    });
});

export { router };
