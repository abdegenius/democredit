import express from "express";
import AuthController from "../controllers/auth";
import validator from "../middlewares/validator";
// eslint-disable-next-line new-cap
const authRoutes = express.Router();

authRoutes.post("/login", validator("/auth/login"), AuthController.login);

authRoutes.post(
  "/register",
  validator("/auth/register"),
  AuthController.register
);

export default authRoutes;
