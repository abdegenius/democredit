import express from "express";
import WalletController from "../controllers/wallet";
import { authHandler } from "../middlewares/auth";
// eslint-disable-next-line new-cap
const walletRoutes = express.Router();

walletRoutes.post("/deposit", authHandler, WalletController.deposit);
walletRoutes.post("/withdrawal", authHandler, WalletController.withdrawal);
walletRoutes.post("/transfer", authHandler, WalletController.transfer);

export default walletRoutes;
