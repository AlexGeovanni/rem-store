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

export type TypeSortBy = {
  key: string;
  label: string;
};


export const SORTBY: TypeSortBy[] = [
  {
    key: "createdAt",
    label: "Recientes",
  },
  {
    key: "asc",
    label: "Menor precio",
  },
  {
    key: "desc",
    label: "Mayor precio",
  },
];
