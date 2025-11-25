import { PrismaClient } from "@prisma/client/extension";
import { CarInfoModel, UserModel } from "../generated/prisma/models.js"
import { prisma } from "../lib/prisma.js"
import { CarInfoDto } from "../utils/car-info-dto.util.js";

export interface CarInfoService {
  getAllCarsForUser(userId: number): Promise<CarInfoModel[]>;
  createCarForUser(make: string, model: string, year: number, userId: number): Promise<CarInfoModel>;
  getCarForUser(carId: number, userId: number): Promise<CarInfoDto | null>;
}

export function createCarInfoService(): CarInfoService {
  return {
    getAllCarsForUser: async (userId: number): Promise<CarInfoModel[]> => {
      return prisma.carInfo.findMany({where: { userId: userId }});
    },
    createCarForUser: async (make: string, model: string, year: number, userId: number): Promise<CarInfoModel> => {
      return prisma.carInfo.create({
        data: {
          make: make,
          model: model,
          year: year,
          userId: userId
        }
      })
    },
    getCarForUser: async (carId: number, userId: number): Promise<CarInfoDto | null> => {
      const record = await prisma.carInfo.findFirst({
        where: {
          id: carId,
          userId: userId
        }
      });
      return record ? CarInfoDto.parse(record) : null;
    }
  }
}

export const carInfoService = createCarInfoService();
