import { z } from "zod";

// Base fields (shared)
const carInfoBase = {
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().gte(1886).lte(new Date().getFullYear() + 1), // sanity check
  userId: z.number().int(),
};

// -----------
// CREATE DTO
// -----------
export const CreateCarInfoDto = z.object({
  ...carInfoBase,
});

export type CreateCarInfoDto = z.infer<typeof CreateCarInfoDto>;

// -----------
// UPDATE DTO (partial)
// -----------
export const UpdateCarInfoDto = z.object({
  ...carInfoBase,
}).partial();

export type UpdateCarInfoDto = z.infer<typeof UpdateCarInfoDto>;

// -----------
// FULL DTO (like Prisma return type)
// -----------
export const CarInfoDto = z.object({
  id: z.number().int(),
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  created: z.date(),
  userId: z.number().int(),
  // optionally include related user if needed
  // user: UserDto.optional()
});

export type CarInfoDto = z.infer<typeof CarInfoDto>;
