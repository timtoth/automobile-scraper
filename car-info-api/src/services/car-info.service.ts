import { CarInfo } from "../models/car-info.model";

let products: CarInfo[] = [
  { id: 1, make: "Laptop", price: 1299 } as CarInfo, 
];

export const getAllProducts = () => products;

export const getProduct = (id: number) =>
  products.find(p => p.id === id);

export const addProduct = (data: Omit<CarInfo, "id">) => {
  const newProduct: CarInfo = { id: (products.length + 1), ...data };
  products.push(newProduct);
  return newProduct;
};
