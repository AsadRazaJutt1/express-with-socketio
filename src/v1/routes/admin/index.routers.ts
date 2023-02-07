import { Router } from "express";
import { router as organizationRouter } from "./organization.routers";

const router = Router();

router.get("/", (req, res) => {
    res.send({
        message: `Admin API`,
    });
});

router.use("/organization", organizationRouter);

export { router };
