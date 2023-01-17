import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";

function index(req: Request, res: Response) {
    const {
        HTTP_OK: { code, message },
    } = HttpStatusCode;

    res.status(code).json({ message });
}

export { index };
