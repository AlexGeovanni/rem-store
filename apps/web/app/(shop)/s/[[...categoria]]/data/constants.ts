type Default = {
  id: number;
  label: string;
};

export type TypeBuyPrice = Default & {
  min: number | null;
  max: number | null;
};

export const buyPrice: TypeBuyPrice[] = [
  {
    id: 1,
    label: "Menos de $800",
    min: 0,
    max: 800,
  },
  {
    id: 2,
    label: "$800 - $1500",
    min: 800,
    max: 1500,
  },
  {
    id: 3,
    label: "Mas de $1500",
    min: 1500,
    max: null,
  },
];

export type TypeDiscount = Default & {
  value: boolean;
};

export const discount: TypeDiscount[] = [
  {
    id: 4,
    label: "Rebajas",
    value: true,
  },
];

export type TypeCategory = Default & {
  value: string;
};

export const fashionsCheckbox: TypeCategory[] = [
  {
    id: 5,
    label: "Hombre",
    value: "hombre",
  },
  {
    id: 6,
    label: "Mujer",
    value: "mujer",
  },
  {
    id: 7,
    label: "Niños y Niñas",
    value: "niños&niñas",
  },
];

export const electronicsCheckbox: TypeCategory[] = [
  {
    id: 8,
    label: "Celular",
    value: "celular",
  },
  {
    id: 9,
    label: "Laptop",
    value: "laptop",
  },
  {
    id: 10,
    label: "Otros",
    value: "otros",
  },
];

export const homeCheckbox: TypeCategory[] = [
  {
    id: 11,
    label: "Sillas y bancos",
    value: "silla&banco",
  },
  {
    id: 12,
    label: "Estantes y libreros",
    value: "estante&librero",
  },
  {
    id: 13,
    label: "Mesas de comedor",
    value: "mesa",
  },
];

export const clote: TypeCategory[] = [
  {
    id: 1,
    label: "Manga corta",
    value: "",
  },
  {
    id: 2,
    label: "Manga Larga",
    value: "",
  },
  {
    id: 3,
    label: "Pantalon",
    value: "",
  },
  {
    id: 4,
    label: "Sudaderas con y sin gorro",
    value: "",
  },
];

export const electronic: TypeCategory[] = [
  {
    id: 5,
    label: "Intel",
    value: "",
  },
  {
    id: 6,
    label: "SSD",
    value: "",
  },
  {
    id: 7,
    label: "Gamer",
    value: "",
  },
];

export const SORTBY = {
  RECIENTES: "Recientes",
  MENOR_PRECIO: "Menor precio",
  MAYOR_PRECIO: "Mayor precio",
} as const;
