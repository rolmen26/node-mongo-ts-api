import { Router } from "express";

import { createUser, getAllUsers, getUserByUuid } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/user", createUser);

userRouter.get("/users", getAllUsers);

userRouter.get("/user/:id", getUserByUuid);

export default userRouter;