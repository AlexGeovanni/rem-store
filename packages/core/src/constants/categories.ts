export const CATEGORY_KEYS = ["moda", "electronica", "hogar"] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const CATEGORY_IDS = ["1", "2", "3"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CATEGORY_SLUGS = ["moda", "electronica", "hogar"] as const;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryDefinition = {
  id: CategoryId;
  key: CategoryKey;
  slug: CategorySlug;
  label: string;
  shopTitle: string;
  dealLabel: string;
  idKey:string
};

export const CATEGORIES: readonly CategoryDefinition[] = [
  {
    id: "1",
    key: "moda",
    slug: "moda",
    label: "Moda",
    shopTitle: "Colección de Moda",
    dealLabel: "Ropa",
    idKey:"dYW2POjmXKxeVAPe4plwB0kQaNrLg8"
  },
  {
    id: "2",
    key: "electronica",
    slug: "electronica",
    label: "Electrónicos",
    shopTitle: "Electrónicos",
    dealLabel: "Electrónicos",
    idKey:"km0XYn3xaD7Z24lNvlPjzNVKQrpL9w"
  },
  {
    id: "3",
    key: "hogar",
    slug: "hogar",
    label: "Hogar",
    shopTitle: "Artículos para el Hogar",
    dealLabel: "Hogar",
    idKey:"W1Dykzwr6oBPlv1K4N0YR5n8ZdmVGb"
  },
] as const;

export const DASHBOARD_CATEGORIES = CATEGORIES.map(({ label, idKey }) => ({
  value: idKey,
  label,
}));

export const SUB_CATEGORIES_FASHION = [
  { label: "Hombre", value: "hombre" },
  { label: "Mujer", value: "mujer" },
  { label: "Niño & Niña", value: "niño & niña" },
] as const;

export const SUB_CATEGORIES_ELECTRONIC = [
  { label: "Celular", value: "celular" },
  { label: "Tablet", value: "tablet" },
  { label: "Laptop", value: "laptop" },
] as const;

export const SUB_CATEGORIES_HOME = [
  { label: "Sala", value: "sala" },
  { label: "Comedor", value: "comedor" },
  { label: "Recámara", value: "recámara" },
] as const;

export const ELECTRONICS_RAM = [
  { label: "4GB", value: "4GB" },
  { label: "8GB", value: "8GB" },
  { label: "16GB", value: "16GB" },
  { label: "32GB", value: "32GB" },
  { label: "64GB", value: "64GB" },
  { label: "128GB", value: "128GB" },
  { label: "Otro", value: "Other" },
] as const;

export const ELECTRONICS_STORAGE = [
  { label: "32GB", value: "32GB" },
  { label: "64GB", value: "64GB" },
  { label: "128GB", value: "128GB" },
  { label: "256GB", value: "256GB" },
  { label: "512GB", value: "512GB" },
  { label: "1TB", value: "1TB" },
  { label: "2TB", value: "2TB" },
  { label: "Otro", value: "Other" },
] as const;

export const ELECTRONICS_BRANDS = [
  { label: "Apple", value: "apple" },
  { label: "ASUS", value: "asus" },
  { label: "Acer", value: "acer" },
  { label: "Dell", value: "dell" },
  { label: "Google", value: "google" },
  { label: "Lenovo", value: "lenovo" },
  { label: "HP", value: "hp" },
  { label: "Huawei", value: "huawei" },
  { label: "Motorola", value: "motorola" },
  { label: "MSI", value: "msi" },
  { label: "Samsung", value: "samsung" },
  { label: "Xiaomi", value: "xiaomi" },
  { label: "Otro", value: "Other" },
] as const;

export const DEAL_FILTER_CATEGORIES = [
  { id: "all", label: "Todos" },
  ...CATEGORIES.map(({ key, dealLabel }) => ({
    id: key,
    label: dealLabel,
  })),
] as const;

export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORY_SLUGS.includes(slug as CategorySlug);
}

export function getCategoryBySlug(
  slug: string,
): CategoryDefinition | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryByKey(key: string): CategoryDefinition | undefined {
  return CATEGORIES.find((category) => category.key === key);
}

export function getCategoryById(id: string): CategoryDefinition | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function slugToCategoryKey(slug: CategorySlug): CategoryKey {
  const category = getCategoryBySlug(slug);
  if (!category) {
    throw new Error(`Categoría no válida: ${slug}`);
  }
  return category.key;
}

export function getShopCategoryPath(slug: CategorySlug): string {
  return `/s/${slug}`;
}
