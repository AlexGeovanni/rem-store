export const API_CONFIG = {
  baseURL: process.env.API_URL ?? "http://localhost:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};