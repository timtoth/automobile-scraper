import { Request, Response } from "express";
import { authenticateUser, generateToken } from "../services/auth.service.js";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = authenticateUser(email, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token
  });
};
