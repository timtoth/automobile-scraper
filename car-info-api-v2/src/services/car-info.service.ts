import { PrismaClient } from "@prisma/client/extension";
import { CarInfoModel, UserModel } from "../generated/prisma/models.js"
import { prisma } from "../lib/prisma.js"
import { CarInfoDto } from "../utils/car-info-dto.util.js";

export interface CarInfoService {
  getAllCarsForUser(userId: number): Promise<CarInfoModel[]>;
  createCarForUser(make: string, model: string, year: number, userId: number): Promise<CarInfoModel>;
  getCarForUser(carId: number, userId: number): Promise<CarInfoModel>;
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
    getCarForUser: async (carId: number, userId: number): Promise<CarInfoDto> => {
      return prisma.carInfo.findFirst({where: { userId: userId } }).then(x => CarInfoDto.parse(x));
    }
  }
}

export const carInfoService = createCarInfoService();

export async function SeedOneUser() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: 'Tim',
      email: 'tim.toth13@gmail.com',
      cars: {
        create: {
          make: 'BMW',
          model: 'i4',
          year: 2025,
        },
      },
      role: {
      }
    },
    include: {
      cars: true,
      role: true
    },
  });
  console.log('Created user:', user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      cars: true,
    },
  });
  console.log('All users:', JSON.stringify(allUsers, null, 2));
}

// SeedOneUser()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })


