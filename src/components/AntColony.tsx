import { useControls } from "leva";
import { useState, useRef } from "react";
import { Ant } from "./Ant";
import { Plane, PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { PheromoneVisual } from "./PheromoneVisual";
import { Food } from "./Food";
const GRID_SIZE = 30;
export function AntColony() {
  const pheromoneTrail = useRef<number[][]>([[0, 0, 0]]);
  const [foodSource, setFoodSource] = useState<number[][]>([]);
  const { antNumber, antSpeed } = useControls("Configs", {
    antNumber: {
      value: 1,
      min: 1,
      max: 10000,
      step: 1,
    },
    antSpeed: {
      value: 0.05,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });
  return (
    <>
      {/* Grid cartesiano*/}
      {/* <gridHelper
          position={[0, 0, 0]}
          args={[30, 30, "#84beee", "#202020"]}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={(event) => setFoodSource((old) => [...old, event.point])}
        /> */}
      <Plane
        args={[30, 30, 30, 30]}
        onClick={(event) => setFoodSource((old) => [...old, event.point])}
      >
        <meshBasicMaterial wireframe color={"#282828"} />
      </Plane>
      <Points limit={10000}>
        <PointMaterial
          // transparent
          vertexColors
          size={5}
          sizeAttenuation={false}
          depthWrite={false}
        />

        {[...Array(antNumber).keys()].map((antPosition, index) => (
          <Ant
            key={index}
            position={[0, 0, 0]}
            pheromoneTrail={pheromoneTrail}
            foodSource={foodSource}
            gridSize={GRID_SIZE}
            antSpeed={antSpeed}
          />
        ))}
      </Points>
      {/* <PheromoneVisual gridSize={GRID_SIZE} pheromoneTrail={pheromoneTrail} /> */}
      <Food foodSource={foodSource} />
    </>
    // <mesh ref={antRef}>
    //   <bufferGeometry attach="geometry" />
    //   <shaderMaterial attach="material" args={[AntShaderMaterial]} />
    // </mesh>
  );
}
