import { useGLTF } from "@react-three/drei";
import Model from "./model";

const DECORATIVE_JAR_PATH = "/assets/decoratives/decorative_jar.glb";

const DecorativeJar = () => <Model path={DECORATIVE_JAR_PATH} />;

useGLTF.preload(DECORATIVE_JAR_PATH);

export default DecorativeJar;
