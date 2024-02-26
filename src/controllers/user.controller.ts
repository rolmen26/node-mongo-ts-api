import Users from "../models/user.model";
import { Request, Response } from "express";
import logger from "../utils/winston";
import { StatusCodes } from 'http-status-codes';
import { hash } from "bcrypt";

const createUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            logger.error(`Error creating user`);
            res.status(StatusCodes.BAD_REQUEST).send({ message: "Email, password and name are required" });
        }
        const hashedPassword = await hash(req.body.password, 10);
        const user = new Users({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        });
        let newUser = await user.save();
        logger.info(`User ${req.body.email} created`);
        res.status(StatusCodes.CREATED).send({ message: "User created", user: newUser});
    } catch (error: object | any) {
        if (error.code === 11000) {
            logger.error(`User ${req.body.email} already exists`);
            res.status(StatusCodes.CONFLICT).send({ message: "Email already exists" });
        } else if (error.name === 'ValidationError') {
            logger.error(`Error creating user ${req.body.email}`);
            res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
        } else {
            logger.error(`Error creating user ${req.body.email}`);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
        }
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await Users.find();
        res.status(StatusCodes.OK).send(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

const getUserByUuid = async (req: Request, res: Response) => {
    try {
        if (!req.params.uuid) {
            res.status(StatusCodes.BAD_REQUEST).send({ message: "UUID is required" });
        }
        const user = await Users.findOne({ uuid: req.params.uuid });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
        }
        res.status(StatusCodes.OK).send(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}


export { createUser, getUsers, getUserByUuid };