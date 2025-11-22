import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("ERROR:", err);
  // TODO: Log error to postgres
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
}
