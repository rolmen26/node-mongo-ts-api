import { UserInterface } from "../interfaces/UserInterface";
import { Model, Schema, model } from "mongoose";


const UsersSchema = new Schema({
    uuid:
    {
        type: Schema.Types.String,
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

const UserSchema: Model<UserInterface> = model<UserInterface>("User", UsersSchema);

export default UserSchema;