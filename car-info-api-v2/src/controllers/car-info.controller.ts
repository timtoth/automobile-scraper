import { Request, Response } from "express";
import { carInfoService, CarInfoService } from "../services/car-info.service.js";
import { CreateCarInfoDto } from "../utils/car-info-dto.util.js";

export interface CarInfoController {
  getCars(req: Request, res: Response): Promise<void>;
  getCarById(req: Request, res: Response): Promise<void>;
  createCar(req: Request, res: Response): Promise<void>;
}

export function createCarController(carService: CarInfoService) {
 return {
    getCars: async (req: Request, res: Response) => {
      const userId = Number(req.user?.id ?? 0);
      const cars = await carService.getAllCarsForUser(userId);
      res.status(200).json(cars);
    },
    getCarById: async (req: Request, res: Response) => {
      const userId = req.user?.id ?? 0;
      const carId = Number(req.params.id);
      const car = await carService.getCarForUser(carId, userId);
      if (!car) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(car);
    },
    createCar: async (req: Request, res: Response) => {
      const carBody = CreateCarInfoDto.parse(req.body);
      const userId = req.user?.id ?? 0;
      const car = await carService.createCarForUser(carBody.make, carBody.model, carBody.year, userId);
      res.status(200).json(car);
    }
 } as CarInfoController;
}

export const carController = createCarController(carInfoService);