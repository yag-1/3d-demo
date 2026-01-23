import { Canvas, type ThreeEvent } from "@react-three/fiber";
import "./App.css";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import type { ProductData } from "./components/product/product.types";
import ProductMesh from "./components/product/product-mesh";
import Popup from "./components/popup/popup";
import { POPUP_X_GAP, POPUP_Y_GAP } from "./constants/constants";
import ConnectorLine from "./components/connector-line/connector-line";
import Chair from "./components/models/chair";
import Desk from "./components/models/desk";
import Carpet from "./components/models/carpet";
import DecorativeJar from "./components/models/decorative-jar";

const App = () => {
  const [hoveredProduct, setHoverProduct] = useState<ProductData | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
      setPopupPos(pos);
      setMousePos(pos);
    }
  };

  const handleHoverMove = (event: ThreeEvent<PointerEvent>) => {
    setMousePos(getRelativePos(event));
  };

  const popupCorner = {
    x: popupPos.x + POPUP_X_GAP,
    y: popupPos.y + POPUP_Y_GAP,
  };

  // Center of the scene (where desk is)
  const sceneCenter: [number, number, number] = [0, 0, 0];

  // Chair positions around the desk (adjust based on your desk size)
  const chairPositions: { pos: [number, number, number]; rotation: number }[] =
    [
      { pos: [-0.5, -0.05, -0.2], rotation: Math.PI / 2 },
      { pos: [0.8, -0.05, 0.25], rotation: -Math.PI / 2 },

      { pos: [0.5, -0.05, 0.25], rotation: Math.PI },
      { pos: [0.5, -0.05, 1], rotation: Math.PI },

      { pos: [-0.15, -0.05, -0.25], rotation: 0 },
      { pos: [-0.15, -0.05, -1], rotation: 0 },
    ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>3D - Demo</h1>
      <div
        ref={containerRef}
        style={{
          width: 1600,
          height: 900,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [4, 3, 4], fov: 50 }}
          gl={{ antialias: true }}
        >
          <Environment preset="apartment" background={false} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.0001}
          />

          <ContactShadows
            position={[0, 2, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          {/* Floor */}
          <mesh
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#709dff" />
          </mesh>

          {/* Desk at center */}
          <ProductMesh
            productId="desk-1"
            onHover={handleHoverStart}
            onHoverMove={handleHoverMove}
            position={[0, -0.05, 0]}
          >
            <Desk />
          </ProductMesh>

          <ProductMesh
            productId="decorative-jar-1"
            onHover={handleHoverStart}
            onHoverMove={handleHoverMove}
            position={[1.5, 0, 0]}
          >
            <DecorativeJar />
          </ProductMesh>

          <ProductMesh
            productId="carpet-1"
            onHover={handleHoverStart}
            onHoverMove={handleHoverMove}
            position={[0, -0.05, 0]}
            scale={1.1}
          >
            <Carpet />
          </ProductMesh>

          {/* 6 Chairs around the desk */}
          {chairPositions.map((chair, index) => (
            <ProductMesh
              key={`chair-${index}`}
              productId="chair-1"
              onHover={handleHoverStart}
              onHoverMove={handleHoverMove}
              position={chair.pos}
            >
              <group rotation={[0, chair.rotation, 0]}>
                <Chair />
              </group>
            </ProductMesh>
          ))}

          {/* OrbitControls centered on the desk */}
          <OrbitControls
            target={sceneCenter}
            enablePan={false}
            minDistance={3}
            maxDistance={4.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 3}
          />
        </Canvas>

        {hoveredProduct && <ConnectorLine from={popupCorner} to={mousePos} />}

        {hoveredProduct && (
          <Popup product={hoveredProduct} position={popupPos} />
        )}
      </div>
    </div>
  );
};

export default App;
