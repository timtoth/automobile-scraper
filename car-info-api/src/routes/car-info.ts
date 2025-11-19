import { Router } from "express";
import * as CarsController from "../controllers/car-info.controller";

const router = Router();

router.get("/", CarsController.getCars);
router.get("/:id", CarsController.getCarById);
router.post("/", CarsController.createCar);

export default router;
