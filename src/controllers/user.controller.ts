import Users from "../models/user.model";
import { Request, Response } from "express";
import logger from "../utils/winston";
import { StatusCodes } from 'http-status-codes';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = new Users(req.body);
        await user.save();
        logger.info(`User ${req.body.email} created`);
        res.status(StatusCodes.CREATED).send(user);
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

const getUserByEmail = async (req: Request, res: Response) => {
    try {
        if (!req.params.email) {
            logger.error(`Error getting user ${req.params.email}`);
            res.status(StatusCodes.BAD_REQUEST).send({ message: "Email is required" });
        }
        const user = await Users.findOne({ email: req.params.email });
        if (!user) {
            logger.error(`User ${req.params.email} not found`);
            res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
        } else {
            res.status(StatusCodes.OK).send(user);
        }
    } catch (error) {
        logger.error(`Error getting user ${req.params.email}`);
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

export { createUser, getUsers, getUserByEmail };