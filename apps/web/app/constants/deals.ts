export const categories = [
  {
    id: "all",
    label: "Todos",
  },
  {
    id: "clothing",
    label: "Ropa",
  },
  {
    id: "electronics",
    label: "Electronicos",
  },
  {
    id: "home",
    label: "Hogar",
  },
];

type Category = "clothing" | "electronics" | "home";

export type ProductDeal = {
    id: number;
    title: string;
    image: string;
    price: number;
    sales: number;
    discount: number;
    category: Category;
}

export const dealProducts: ProductDeal[] = [
    {
        id: 1,
        title: "Playera de algodon blanca ",
        image: "/img/pixel.webp",
        price: 500,
        sales: 350,
        discount: 25,
        category: "clothing",

    },
    {
        id: 2,
        title: "Playera de algodon azul ",
        image: "/img/pixel.webp",
        price: 450,
        sales: 300,
        discount: 25,
        category: "clothing",
    },
    {
        id: 3,
        title: "Playera de algodon roja ",
        image: "/img/pixel.webp",
        price: 400,
        sales: 250,
        discount: 25,
        category: "clothing",
    },
    {
        id: 4,
        title: "Playera de algodon verde ",
        image: "/img/pixel.webp",
        price: 500,
        sales: 350,
        discount: 25,
        category: "clothing",
    },
    {
        id: 5,
        title: "Laptop Dell XPS 13",
        image: "/img/pixel.webp",
        price: 1200,
        sales: 1000,
        discount: 25,
        category: "electronics",
    },
    {
        id: 6,
        title: "Laptop HP Pavilion 14",
        image: "/img/pixel.webp",
        price: 3000,
        sales: 2500,
        discount: 15,
        category: "electronics",
    },
    {
        id: 7,
        title: "Laptop Lenovo ThinkPad X1 Carbon",
        image: "/img/pixel.webp",
        price: 2500,
        sales: 2000,
        discount: 25,
        category: "electronics",
    },
    {
        id: 8,
        title: "Laptop Asus ZenBook 14",
        image: "/img/pixel.webp",
        price: 2000,
        sales: 1000,
        discount: 10,
        category: "electronics",
    },
    {
        id: 9,
        title: "Celular Samsung Galaxy S23",
        image: "/img/pixel.webp",
        price: 1200,
        sales: 1000,
        discount: 15,
        category: "electronics",
    },
    {
        id: 10,
        title: "Celular Apple iPhone 14",
        image: "/img/pixel.webp",
        price: 1200,
        sales: 1000,
        discount: 25,
        category: "electronics",
    },
    {
        id: 11,
        title: "Mesa de comedor de madera",
        image: "/img/pixel.webp",
        price: 1600,
        sales: 1400,
        discount: 25,
        category: "home",
    },
    {
        id: 12,
        title: "Silla de madera",
        image: "/img/pixel.webp",
        price: 1000,
        sales: 800,
        discount: 20,
        category: "home",
    },
    {
        id: 13,
        title: "Estante de madera",
        image: "/img/pixel.webp",
        price: 1200,
        sales: 1000,
        discount: 25,
        category: "home",
    },
]