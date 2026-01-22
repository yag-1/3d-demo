import type { ProductData } from "./product.types";

export const products: Record<string, ProductData> = {
  "product-1": {
    id: "product-1",
    title: "Orange Cube",
    description: "This is the product description.",
    price: 29.99,
  },
  "product-2": {
    id: "product-2",
    title: "Matte Cube",
    description: "This is the product description.",
    price: 19.99,
  },
};
