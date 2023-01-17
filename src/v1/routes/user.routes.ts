import { Router, Request, Response } from "express";

const router = Router();

console.log("User API");

router.get("/", (req: Request, res: Response) => {
    res.send({
        message: `User API`,
    });
});

export { router };
