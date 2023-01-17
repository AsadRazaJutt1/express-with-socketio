import { Router, Request, Response } from "express";

const router = Router();

console.log("Organization API");

router.get("/", (req: Request, res: Response) => {
    res.send({
        message: `Organization API`,
    });
});

export { router };
