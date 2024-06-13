import express from "express";
import UserController from "../controllers/user";
import { authHandler } from "../middlewares/auth";
// eslint-disable-next-line new-cap
const userRoutes = express.Router();

userRoutes.get("/profile", authHandler, UserController.profile);


export default userRoutes;
