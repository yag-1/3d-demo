import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment } from "@react-three/drei";
import * as THREE from "three";

function Torus() {
  const scroll = useScroll();
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!torusRef.current) return;
    const offset = scroll.offset;

    torusRef.current.rotation.x += delta * 0.3;
    torusRef.current.rotation.y = offset * Math.PI * 4;
    torusRef.current.position.x = Math.sin(offset * Math.PI * 2) * 2;
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[1, 0.4, 32, 64]} />
      <meshPhysicalMaterial
        color="#ff6b6b"
        metalness={1}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function ScrollContent() {
  return (
    <Scroll html style={{ width: "100%" }}>
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 700, margin: 0 }}>Scroll Demo</h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.7, marginTop: "1rem" }}>
          Scroll down to animate the torus
        </p>
      </section>

      
    </Scroll>
  );
}

export default function ScrollDemo() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#2a4a6a",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: "100%", height: "100%" }}>
        <color attach="background" args={["#2a4a6a"]} />
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <ScrollControls pages={2} damping={0.25}>
          <Scroll>
            <Torus />
          </Scroll>
          <ScrollContent />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
