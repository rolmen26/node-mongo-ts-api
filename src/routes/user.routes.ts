import { Router } from "express";

import { createUser, getUsers, getUserByEmail } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/user", createUser);

userRouter.get("/users", getUsers);

userRouter.get("/user/:email", getUserByEmail);

export default userRouter;