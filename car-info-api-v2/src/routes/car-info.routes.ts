import { Router } from "express";
import { asyncHandler } from "../middleware/async.handler.js";
import { authorizeRoles } from "../middleware/auth.handler.js";
import { validate } from "../middleware/validate.js";
import { CreateCarInfoDto } from "../utils/car-info-dto.util.js";
import { carController } from "../controllers/car-info.controller.js";

const carsRoutes = Router();

carsRoutes.get("/", asyncHandler(carController.getCars));
carsRoutes.get("/:id", asyncHandler(carController.getCarById));
carsRoutes.post(
  "/save",
  authorizeRoles("USER"),
  validate(CreateCarInfoDto),
  asyncHandler(carController.createCar)
);

export default carsRoutes;
