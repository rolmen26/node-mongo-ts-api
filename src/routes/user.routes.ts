import { Router } from "express";

import { createUser, getUsers, getUserByUuid } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/user", createUser);

userRouter.get("/users", getUsers);

userRouter.get("/user/:uuid", getUserByUuid);

export default userRouter;