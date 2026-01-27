import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import type { ProductData } from "../components/product/product.types";
import ProductMesh from "../components/product/product-mesh";
import Popup from "../components/popup/popup";
import { POPUP_X_GAP, POPUP_Y_GAP } from "../constants/constants";
import ConnectorLine from "../components/connector-line/connector-line";
import Chair from "../components/models/chair";
import Desk from "../components/models/desk";
// import Carpet from "../components/models/carpet";
import DecorativeJar from "../components/models/decorative-jar";

export default function ProductDemo() {
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
    event?: ThreeEvent<PointerEvent>
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

  const sceneCenter: [number, number, number] = [0, 0, 0];

  const chairPositions: { pos: [number, number, number]; rotation: number }[] = [
    { pos: [-0.5, -0.05, -0.2], rotation: Math.PI / 2 },
    { pos: [0.8, -0.05, 0.25], rotation: -Math.PI / 2 },
    { pos: [0.5, -0.05, 0.25], rotation: Math.PI },
    { pos: [0.5, -0.05, 1], rotation: Math.PI },
    { pos: [-0.15, -0.05, -0.25], rotation: 0 },
    { pos: [-0.15, -0.05, -1], rotation: 0 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Product Display Demo</h1>
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
          gl={{ antialias: true, toneMapping: 3 }}
        >
          <Environment preset="studio" background={false} environmentIntensity={0.5} />
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 8, 3]}
            intensity={2}
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
            shadow-bias={-0.0002}
          />

          <ContactShadows
            position={[0, -0.049, 0]}
            opacity={0.6}
            scale={8}
            blur={1.5}
            far={3}
            resolution={1024}
          />

          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#8d4604" />
          </mesh>

          <mesh position={[-3, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[12, 5]} />
            <meshStandardMaterial color="#1b323b" />
          </mesh>

          <mesh position={[0, 2, -3]} rotation={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[12, 5]} />
            <meshStandardMaterial color="#1b323b" />
          </mesh>

           <mesh position={[0, 2, 6]} rotation={[0, Math.PI, 0]} receiveShadow>
            <planeGeometry args={[12, 5]} />
            <meshStandardMaterial color="#1b323b" />
          </mesh>

          <mesh position={[3, 2, 3]} rotation={[0, -Math.PI/2, 0]} receiveShadow>
            <planeGeometry args={[12, 5]} />
            <meshStandardMaterial color="#1b323b" />
          </mesh>

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

          {/* <ProductMesh
            productId="carpet-1"
            onHover={handleHoverStart}
            onHoverMove={handleHoverMove}
            position={[0, -0.05, 0]}
            scale={1.1}
          >
            <Carpet />
          </ProductMesh> */}

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
        {hoveredProduct && <Popup product={hoveredProduct} position={popupPos} />}
      </div>
    </div>
  );
}
