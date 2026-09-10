import type { CategoryKey } from "../constants/categories";

type Category = {
  id: string;
  categoryCode:string;
  name: string;
};

type Details = { size: string; color: string; material: string; } | { brand: string; memory: string; ram: string; model: string; } | { material: string; dimensions: string; weight: unknown; }

export type Product ={
  id: string;
  name: string;
  description: string;
  subCategory:string;
  url: string;
  price: number;
  sales: number;
  stock: number;
  active: boolean;
  discount: number;
  category: Category;
  sku:string;
  details:Details ;
  idBusiness: string;
  nameBusiness: string;
}
