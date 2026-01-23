import { useGLTF } from "@react-three/drei";
import Model from "./model";

const CHAIR_PATH = "/assets/chairs/chair_alt.glb";

const Chair = () => <Model path={CHAIR_PATH} />;

useGLTF.preload(CHAIR_PATH);

export default Chair;
