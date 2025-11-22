import { Router } from "express";
import * as CarsController from "../controllers/car-info.controller";
import { asyncHandler } from "../middleware/async.handler";

const router = Router();

router.get("/", asyncHandler(CarsController.getCars));
router.get("/:id", CarsController.getCarById);
router.post("/save", CarsController.createCar);

export default router;
