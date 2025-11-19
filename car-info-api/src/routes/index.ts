import { Router } from "express";
//import usersRoutes from "./users.routes";
import carsRoutes from "./car-info";

const router = Router();

//router.use("/users", usersRoutes);
router.use("/car-info", carsRoutes);

export default router;
