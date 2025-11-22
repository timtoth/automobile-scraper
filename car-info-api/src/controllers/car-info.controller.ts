import { NextFunction, Request, Response } from "express";
import * as ProductsService from "../services/car-info.service";

export const getCars = async (req: Request, res: Response) => {
  const products = ProductsService.getAllProducts();
  res.json(products);
};

export const getCarById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = ProductsService.getProduct(id);

  if (!product) return res.status(404).json({ message: "Product not found" });
  const user = (req as any).user;
  if(user) {
    // send email
  }
  res.json(product);
};

export const createCar = async (req: Request, res: Response) => {
  const newProduct = ProductsService.addProduct(req.body);
  res.status(201).json(newProduct);
};
