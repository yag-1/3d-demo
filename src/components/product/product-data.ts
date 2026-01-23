import type { ProductData } from "./product.types";

export const products: Record<string, ProductData> = {
  "chair-1": {
    id: "chair-1",
    title: "Modern Chair",
    description: "Elegant minimalist chair with ergonomic design.",
    price: 149.99,
  },
  "desk-1": {
    id: "desk-1",
    title: "Conference Table",
    description: "Spacious wooden conference table, perfect for team meetings.",
    price: 899.99,
  },
  "carpet-1": {
    id: "carpet-1",
    title: "Area Rug",
    description: "Soft woven area rug that ties the room together.",
    price: 249.99,
  },
  "decorative-jar-1": {
    id: "decorative-jar-1",
    title: "Decorative Jar",
    description: "Handcrafted ceramic jar, perfect as a statement piece.",
    price: 79.99,
  },
};
