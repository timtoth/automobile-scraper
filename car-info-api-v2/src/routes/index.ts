import { Router } from "express";
import authRoutes from "./auth.routes.js";
import { authenticate } from "../middleware/auth.handler.js";
import carsRoutes from "./car-info.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/car-info", authenticate, carsRoutes);

export default router;
