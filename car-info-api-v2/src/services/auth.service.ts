import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}

export type AuthenticatedUser = Prisma.UserGetPayload<{
  include: { role: true };
}>;

export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  });

  if (!user) return null;

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) return null;

  return user;
}

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<AuthenticatedUser> {
  const saltedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: saltedPassword,
      name,
      role: { connect: { name: "USER" } }
    },
    include: { role: true }
  });
  return user;
}

export function generateToken(user: AuthenticatedUser) {
  return jwt.sign(
    { email: user.email, role: user.role.name },
    JWT_SECRET,
    {
      expiresIn: "1h",
      subject: user.id.toString()
    }
  );
}
