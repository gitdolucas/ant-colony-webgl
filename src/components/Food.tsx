import { useRef, useState } from "react";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSceneStore } from "../store/useSceneStore";
import {shallow} from 'zustand/shallow';

export function Food() {
  // const pointRef = useRef()
  const foodSource = useSceneStore((state) => state.foodSource, shallow);


  return (
    <Points limit={10000}>
      <PointMaterial
        transparent
        color="black"
        vertexColors
        size={12}
        sizeAttenuation={false}
        depthWrite={false}
      />

      {foodSource.map((foodPoint) => (
        <Point position={foodPoint} size={4}/>
      ))}
    </Points>
  );
}
