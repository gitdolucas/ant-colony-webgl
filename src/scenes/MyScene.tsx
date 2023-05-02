import { OrbitControls, Plane, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AntColony } from "../components/AntColony";
import { useSceneStore } from "../store/useSceneStore";
import { Food } from "../components/Food";
import { ToFoodTrail } from "../components/ToFoodTrail";
import { ToNestTrail } from "../components/ToNestTrail";
import { useRef } from "react";
import { SCENE_CONFIG } from "./sceneConfig";
export function MyScene() {
  const setNewFoodSource = useSceneStore((state) => state.setNewFoodSource);
  //   const setNewFoodSource = useSceneStore((state) => state.setNewFoodSource);
  //   const setNewFoodSource = useSceneStore((state) => state.setNewFoodSource);
  const toNestTrailRef = useRef(
    [
      ...Array(SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION).keys(),
    ].map((row) =>
      [...Array(SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION)].map(
        (column) => 1
      )
    )
  );
  const toFoodTrailRef = useRef(
    [
      ...Array(SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION).keys(),
    ].map((row) =>
      [...Array(SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION)].map(
        (column) => 1
      )
    )
  );
  console.log(toNestTrailRef);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas orthographic camera={{ zoom: 5 }}>
        <color attach="background" args={["#333"]} />
        {/* Objects */}

        {/* Visual grid */}
        <Plane
          args={[
            SCENE_CONFIG.GRID_SIZE,
            SCENE_CONFIG.GRID_SIZE,
            SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION,
            SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION,
          ]}
          onPointerMove={(event) =>
            event.shiftKey && setNewFoodSource(event.point)
          }
        >
          <meshBasicMaterial wireframe color={"#4a4a4a"} />
        </Plane>
        <ToNestTrail trailRef={toNestTrailRef.current} />
        <ToFoodTrail trailRef={toFoodTrailRef.current} />
        <Food />
        <AntColony
          toNestMatrix={toNestTrailRef.current}
          toFoodMatrix={toFoodTrailRef.current}
        />
        {/* <PheromoneTrail /> */}

        {/* Controle de câmera */}
        {/* <OrbitControls /> */}

        {/* Status app */}
        <Stats showPanel={0} className="stats" />
      </Canvas>
    </div>
  );
}
