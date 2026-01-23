import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { products } from "./product-data";
import type { ProductMeshProps } from "./product.types";
import type { Mesh } from "three";

const ProductMesh = ({
  productId,
  onHover,
  onHoverMove,
  children,
  position,
  scale = 1,
}: ProductMeshProps) => {
  const product = products[productId];
  const groupRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hovered ? scale * 1.0085 : scale;
    groupRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale },
      0.15,
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      castShadow
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(product, e);
        document.body.style.cursor = "pointer";
      }}
      onPointerMove={(e) => {
        if (hovered && onHoverMove) {
          onHoverMove(e);
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover(null);
        document.body.style.cursor = "auto";
      }}
    >
      {children}
    </group>
  );
};

export default ProductMesh;
