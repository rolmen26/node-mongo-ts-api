import UserRepositoryInterface from "../interfaces/UserRepositoryInterface";
import User from "../entity/User";
import UserSchema from "../schemas/UserSchema";
import logger from "../../lib/utils/logger";
import { StatusCodes } from 'http-status-codes';

class UserRepository implements UserRepositoryInterface {

    schema: typeof UserSchema;

    constructor() {
        this.schema = UserSchema;
    }

    async save(user: User): Promise<User> {
        try {
            const newUser = new this.schema(user);
            return await newUser.save();
        } catch (error: object | any) {
            if (error.code === 11000) {
                logger.error(`User ${user.email} already exists`);
                throw ({ message: "Email already exists", status: StatusCodes.CONFLICT });
            } else if (error.name === 'ValidationError') {
                logger.error(`Error creating user ${user.email}`);
                throw ({ message: error.message, status: StatusCodes.BAD_REQUEST });
            } else {
                logger.error(`Error creating user ${user.email}`);
                throw ({ message: error.message, status: StatusCodes.INTERNAL_SERVER_ERROR });
            }
        }
    }

    async find(id: string): Promise<User> {
        try {
            return this.schema.findOne({ uuid: id });

        } catch (error: object | any) {
            throw new Error(error);
        }
    }


    async findAll(): Promise<User[]> {
        try {
            return this.schema.find({});
        } catch (error: object | any) {
            throw new Error(error);
        }
    }
}

export default UserRepository;