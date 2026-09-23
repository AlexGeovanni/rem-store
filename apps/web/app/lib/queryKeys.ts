export const userQueryKeys = {
  all: ["user"] as const,
  client: () => ["user", "client"] as const,
  business: () => ["user", "business"] as const,
};
