import { useGLTF } from "@react-three/drei";
import Model from "./model";

const DESK_PATH = "/assets/desks/desk.glb";

const Desk = () => <Model path={DESK_PATH} />;

useGLTF.preload(DESK_PATH);

export default Desk;
