import { useControls } from "leva";
import { useState, useRef } from "react";
import { Ant } from "./Ant";
import { Plane, PointMaterial, Points, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Food } from "./Food";
import { SCENE_CONFIG } from "../scenes/sceneConfig";
export function AntColony({toNestMatrix, toFoodMatrix}) {
  // This component will be responsible for all ants in the scene
  // const pheromoneTrail = useRef<number[][]>([[0, 0, 0]]);
  const { antNumber } = useControls("Configs", {
    antNumber: {
      value: 30,
      min: 1,
      max: 10000,
      step: 1,
    },
  });
  return (
    <>
      <Sphere args={[2, 8, 8]}>
        <meshBasicMaterial color={"#f33"} />
      </Sphere>
      <Points limit={10000}>
        <PointMaterial
          transparent
          vertexColors
          size={5}
          sizeAttenuation={true}
          depthWrite={false}
        />

        {[...Array(antNumber).keys()].map((antPosition, index) => (
          <Ant
            key={index}
            position={[0, 0, 0]}
            gridSize={SCENE_CONFIG.GRID_SIZE}
            toNestMatrix={toNestMatrix}
            toFoodMatrix={toFoodMatrix}
          />
        ))}
      </Points>
    </>
  );
}
