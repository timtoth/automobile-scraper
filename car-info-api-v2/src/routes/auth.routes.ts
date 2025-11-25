import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { asyncHandler } from "../middleware/async.handler.js";

const router = Router();

router.post("/login", asyncHandler(new AuthController().login));
router.post("/register", asyncHandler(new AuthController().registerUser));

export default router;
