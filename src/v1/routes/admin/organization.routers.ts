import { Router } from "express";
import {
    getAllOrganization,
    getOneOrganization,
    createNewOrganization,
    updateOneOrganization,
    deleteOneOrganization,
} from "./../../controllers/admin/organization.controller";

const router = Router();

router.get("/", getAllOrganization);

router.post("/", createNewOrganization);

router.get("/:id", getOneOrganization);

router.put("/:id", updateOneOrganization);

router.delete("/:id", deleteOneOrganization);

export { router };
