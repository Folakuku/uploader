import { Router } from "express";
import authRoutes from "./auth.routes";
import fileRoutes from "./file.routes";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();
router.use("/auth", authRoutes);
router.use("/files", isAuthenticated, fileRoutes);

export default router;
