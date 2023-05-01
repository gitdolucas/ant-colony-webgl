import { OrbitControls, Plane, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AntColony } from "../components/AntColony";
import { useSceneStore } from "../store/useSceneStore";
import { Food } from "../components/Food";
import { ToFoodTrail } from "../components/ToFoodTrail";
import { ToNestTrail } from "../components/ToNestTrail";
export function MyScene() {
  const setNewFoodSource = useSceneStore((state) => state.setNewFoodSource);
//   const setNewFoodSource = useSceneStore((state) => state.setNewFoodSource);
//   const setNewFoodSource = useSceneStore((state) => state.setNewFoodSource);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas orthographic camera={{ zoom: 20 }}>
        <color attach="background" args={["#333"]} />
        {/* Objects */}

        {/* Visual grid */}
        <Plane
          args={[30, 30, 30, 30]}
          onClick={(event) => setNewFoodSource(event.point)}
        >
          <meshBasicMaterial wireframe color={"#282828"} />
        </Plane>
        <ToFoodTrail />
        <ToNestTrail />
        <Food />
        <AntColony />
        {/* <PheromoneTrail /> */}

        {/* Controle de câmera */}
        {/* <OrbitControls /> */}

        {/* Status app */}
        <Stats showPanel={0} className="stats" />
      </Canvas>
    </div>
  );
}
