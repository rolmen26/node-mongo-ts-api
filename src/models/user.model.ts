import { UserInterface } from "../interfaces/user.interface";
import { Model, Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new Schema({
    uuid:
    {
        type: Schema.Types.String,
        default: uuidv4(),
        required: true,
        unique: true
    },
    email:
    {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password:
    {
        type: Schema.Types.String,
        required: true
    },
    name:
    {
        type: Schema.Types.String,
        required: true
    },
    createdAt:
    {
        type: Schema.Types.Date,
        default: Date.now
    },
    updatedAt:
    {
        type: Schema.Types.Date,
    }
}, {
    collection: 'users',
    versionKey: false
});

const Users: Model<UserInterface> = model<UserInterface>("User", UserSchema);

export default Users;