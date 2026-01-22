import type { ThreeEvent } from "@react-three/fiber";

export interface ProductData {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductMeshProps {
  productId: string;
  onHover: (
    product: ProductData | null,
    event?: ThreeEvent<PointerEvent>,
  ) => void;
  onHoverMove?: (event: ThreeEvent<PointerEvent>) => void;
  children: React.ReactNode;
  position?: [number, number, number];
}
