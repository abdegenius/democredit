import express from "express";
import authRoutes from "./auth";
import { Request, Response } from "express";
// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ data: "Welcome!" });
});
router.use("/auth/", authRoutes);

export default router;
