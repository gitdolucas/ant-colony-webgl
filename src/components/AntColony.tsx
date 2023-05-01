import { useControls } from "leva";
import { useState, useRef } from "react";
import { Ant } from "./Ant";
import { Plane, PointMaterial, Points, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Food } from "./Food";
const GRID_SIZE = 30;
export function AntColony() {
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
      <Sphere args={[0.5, 8, 8]}/>
      <Points limit={10000}>
        <PointMaterial
          transparent
          vertexColors
          size={6}
          sizeAttenuation={true}
          depthWrite={false}
        />

        {[...Array(antNumber).keys()].map((antPosition, index) => (
          <Ant key={index} position={[0, 0, 0]} gridSize={GRID_SIZE} />
        ))}
      </Points>
    </>
  );
}
