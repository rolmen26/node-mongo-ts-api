import { Document } from "mongoose";

export interface UserInterface extends Document {
    uuid: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt?: Date;
}