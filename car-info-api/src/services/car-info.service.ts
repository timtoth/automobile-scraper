import { CarInfo } from "../models/car-info.model";

let products: CarInfo[] = [
  { id: 1, make: "BMWW", model: "i4", price: 80_000_000 } as CarInfo, 
];

export const getAllProducts = (): CarInfo[] => {
  // TODO: get from postgres
  return products;
}

export const getProduct = (id: number): CarInfo | undefined =>
  products.find(p => p.id === id);

export const addProduct = (data: Omit<CarInfo, "id">): CarInfo => {
  const newProduct: CarInfo = { id: (products.length + 1), ...data };
  products.push(newProduct);
  return newProduct;
};
