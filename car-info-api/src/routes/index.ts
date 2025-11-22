import { Router } from "express";
import carsRoutes from "./car-info.routes";
import authRoutes from "./auth.routes";
import { authenticate } from "../middleware/auth.handler";

const router = Router();

router.use("/auth", authRoutes);
router.use("/car-info", authenticate, carsRoutes);

export default router;
