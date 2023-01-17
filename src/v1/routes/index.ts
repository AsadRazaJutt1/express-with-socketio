import { Router, Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import { router as adminRouter } from "./admin.routes";
import { router as organizationRouter } from "./organization.routes";
import { router as userRouter } from "./user.routes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send({
        message: `Welcome to the ${process.env.APP_NAME} v1 API`,
    });
});

router.use("/admin", adminRouter);
router.use("/organization", organizationRouter);
router.use("/user", userRouter);

router.all("*", (req: Request, res: Response) => {
    const {
        HTTP_NOT_FOUND: { code, message },
    } = HttpStatusCode;
    res.status(code).send({
        message,
    });
});

export { router };
