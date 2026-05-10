export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export const cartData: CartItem[] = [
    {
        id: 1,
        name: "Camisa de algodon blanca talla M para hombre",
        price: 100,
        quantity: 1,
        image: "/img/pixel.webp",
    },
    {
        id: 2,
        name: "Pantalon de mezclilla azul talla 32 para hombre",
        price: 200,
        quantity: 1,
        image: "/img/pixel.webp",
    },
    {
        id: 3,
        name: "Zapatos deportivos negros talla 42 para hombre",
        price: 300,
        quantity: 1,
        image: "/img/pixel.webp",
    },
    {
        id: 4,
        name: "Camisa de algodon blanca talla M para hombre",
        price: 100,
        quantity: 1,
        image: "/img/pixel.webp",
    },
    {
        id: 5,
        name: "Pantalon de mezclilla azul talla 32 para hombre",
        price: 200,
        quantity: 1,
        image: "/img/pixel.webp",
    },
]

