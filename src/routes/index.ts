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

router.get("/greet", (req: Request, res: Response) => {
  const name = req.query.name || "World";
  res.json({ message: `Hello, ${name}!` });
});
router.use("/auth/", authRoutes);
router.use("/user/", userRoutes);
router.use("/wallet/", walletRoutes);

export default router;
