import { useGLTF } from "@react-three/drei";
import Model from "./model";

const CARPET_PATH = "/assets/carpets/carpet.glb";

const Carpet = () => <Model path={CARPET_PATH} />;

useGLTF.preload(CARPET_PATH);

export default Carpet;
