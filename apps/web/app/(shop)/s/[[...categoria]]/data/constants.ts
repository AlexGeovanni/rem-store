type Default = {
  id: number;
  label: string;
};

export type TypeBuyPrice = Default & {
  min: number | null;
  max: number | null;
};


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
