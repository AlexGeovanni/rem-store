import type { CategoryKey } from "../constants/categories";

type Category = {
  id: string;
  categoryCode:string;
  name: string;
};

type Details ={
  size: string;
  category: string;
  material: string;
}

export type Product ={
  id: string;
  name: string;
  description: string;
  url: string;
  price: number;
  sales: number;
  stock: number;
  active: boolean;
  discount: number;
  category: Category;
  details?:Details;
  idBusiness: string;
  nameBusiness: string;
}

export const DealsProduct: Product[] = [
  {
    id: "1",
    name: "Playera de algodón blanca",
    description: "Playera cómoda de algodón color blanco",
    url: "/img/pixel.webp",
    price: 500,
    sales: 350,
    stock: 50,
    active: true,
    discount: 25,
    category: "fashion",
    idBusiness: "b1",
    nameBusiness: "Tienda Moda"
  },
  {
    id: "2",
    name: "Playera de algodón azul",
    description: "Playera cómoda de algodón color azul",
    url: "/img/pixel.webp",
    price: 450,
    sales: 300,
    stock: 40,
    active: true,
    discount: 25,
    category: "fashion",
    idBusiness: "b1",
    nameBusiness: "Tienda Moda"
  },
  {
    id: "3",
    name: "Laptop Dell XPS 13",
    description: "Laptop ligera y potente para trabajo",
    url: "/img/pixel.webp",
    price: 1200,
    sales: 1000,
    stock: 20,
    active: true,
    discount: 25,
    category: "electronic",
    idBusiness: "b2",
    nameBusiness: "Tech Store"
  },
  {
    id: "4",
    name: "Celular Samsung Galaxy S23",
    description: "Smartphone de gama alta",
    url: "/img/pixel.webp",
    price: 1200,
    sales: 1000,
    stock: 30,
    active: true,
    discount: 15,
    category: "electronic",
    idBusiness: "b2",
    nameBusiness: "Tech Store"
  },
  {
    id: "5",
    name: "Mesa de comedor de madera",
    description: "Mesa resistente para comedor",
    url: "/img/pixel.webp",
    price: 1600,
    sales: 1400,
    stock: 10,
    active: true,
    discount: 25,
    category: "home",
    idBusiness: "b3",
    nameBusiness: "Hogar & Muebles"
  }
];