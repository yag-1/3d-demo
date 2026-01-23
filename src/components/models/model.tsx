import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { Mesh } from "three";

interface ModelProps {
  path: string;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

const Model = ({
  path,
  castShadow = true,
  receiveShadow = true,
}: ModelProps) => {
  const { scene } = useGLTF(path);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true); // Deep clone
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
      }
    });
    return clone;
  }, [scene, castShadow, receiveShadow]);

  return <primitive object={clonedScene} />;
};

export default Model;
