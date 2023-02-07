import { Request, Response } from "express";
import {
    getAllOrganizationServices,
    getOneOrganizationServices,
    createNewOrganizationServices,
    updateOneOrganizationServices,
    deleteOneOrganizationServices,
} from "../../services/organization.services";

/**
 * Get All Organization
 *
 * @param req
 * @param res
 */
function getAllOrganization(req: Request, res: Response) {
    const organizations = getAllOrganizationServices();
    console.log("");

    res.send(organizations);
}

/**
 * Gets one organization
 * @param req
 * @param res
 */
function getOneOrganization(req: Request, res: Response) {
    res.send("Get an existing workout");
}

/**
 * Creates new organization
 * @param req
 * @param res
 */
function createNewOrganization(req: Request, res: Response) {
    console.log(req.body);

    res.send("Create a new workout");
}

/**
 * Updates one organizationS
 * @param req
 * @param res
 */
function updateOneOrganization(req: Request, res: Response) {
    res.send("Update an existing workout");
}

/**
 * Deletes one organization
 * @param req
 * @param res
 */
function deleteOneOrganization(req: Request, res: Response) {
    res.send("Delete an existing workout");
}

export {
    getAllOrganization,
    getOneOrganization,
    createNewOrganization,
    updateOneOrganization,
    deleteOneOrganization,
};
