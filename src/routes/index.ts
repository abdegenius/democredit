import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import walletRoutes from "./wallet";
import { Request, Response } from "express";
// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ data: "Welcome!" });
});
router.use("/auth/", authRoutes);
router.use("/user/", userRoutes);
router.use("/wallet/", walletRoutes);

export default router;
