import { Canvas, type ThreeEvent } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import type { ProductData } from "./components/product/product.types";
import ProductMesh from "./components/product/product-mesh";
import Popup from "./components/popup/popup";
import { POPUP_X_GAP, POPUP_Y_GAP } from "./constants/constants";
import ConnectorLine from "./components/connector-line/connector-line";

const App = () => {
  const [hoveredProduct, setHoverProduct] = useState<ProductData | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 }); // Fixed
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Live
  const containerRef = useRef<HTMLDivElement>(null);

  const getRelativePos = (event: ThreeEvent<PointerEvent>) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: event.nativeEvent.clientX - rect.left,
      y: event.nativeEvent.clientY - rect.top,
    };
  };

  const handleHoverStart = (
    product: ProductData | null,
    event?: ThreeEvent<PointerEvent>,
  ) => {
    setHoverProduct(product);
    if (event) {
      const pos = getRelativePos(event);
      setPopupPos(pos); // Set Popup position once on enter
      setMousePos(pos);
    }
  };

  const handleHoverMove = (event: ThreeEvent<PointerEvent>) => {
    setMousePos(getRelativePos(event)); // Update live position
  };

  const popupCorner = {
    x: popupPos.x + POPUP_X_GAP,
    y: popupPos.y + POPUP_Y_GAP,
  };

  return (
    <>
      <h1>3D - Demo</h1>
      <div
        ref={containerRef}
        style={{
          width: 800,
          height: 450,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Canvas shadows>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
          <mesh
            position={[0, -0.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#DDD" />
          </mesh>
          <ProductMesh
            productId="product-1"
            onHover={handleHoverStart}
            onHoverMove={handleHoverMove}
            position={[0, 0, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial metalness={1} color="orange" />
          </ProductMesh>

          <ProductMesh
            productId="product-2"
            onHover={handleHoverStart}
            onHoverMove={handleHoverMove}
            position={[2, 0, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </ProductMesh>
          <OrbitControls />
        </Canvas>

        {hoveredProduct && <ConnectorLine from={popupCorner} to={mousePos} />}

        {hoveredProduct && (
          <Popup product={hoveredProduct} position={popupPos} />
        )}
      </div>
    </>
  );
};

export default App;
