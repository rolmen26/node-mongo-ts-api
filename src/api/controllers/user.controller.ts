import { Request, Response } from "express";
import logger from "../../../lib/utils/logger";
import { StatusCodes } from 'http-status-codes';
import UserRepository from "../../repository/UserRepository";
import UserService from "../../services/UserServices";

const userRepo = new UserRepository();

const userServices = new UserService(userRepo);

const createUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            logger.error(`Error creating user`);
            res.status(StatusCodes.BAD_REQUEST).send({ message: "Email, password and name are required" });
        }
        const newUser = await userServices.createUser(req.body);
        logger.info(`User ${req.body.email} created`);
        res.status(StatusCodes.CREATED).send({ message: "User created", user: newUser });
    } catch (error: object | any) {
        res.status(error.status).send({ message: error.message });
    }

};


const getUserByUuid = async (req: Request, res: Response) => {
    try {
        const user = await userServices.getUserByUuid(req.params.id);
        res.status(StatusCodes.OK).send(user);
    } catch (error: object | any) {
        res.status(error.status).send({ message: error.message });
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userServices.getUsers();
        res.status(StatusCodes.OK).send(users);
    } catch (error: object | any) {
        res.status(error.status).send({ message: error.message });
    }
};

export { createUser, getAllUsers, getUserByUuid };