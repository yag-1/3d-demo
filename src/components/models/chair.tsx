import { useGLTF } from "@react-three/drei";

const Chair = () => {
  const { scene } = useGLTF("/assets/chair/chair.glb");

  return <primitive object={scene} />;
};

useGLTF.preload("/assets/chair/chair.glb");

export default Chair;
