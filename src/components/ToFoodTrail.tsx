import { useRef, useState } from "react";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSceneStore } from "../store/useSceneStore";
import { shallow } from "zustand/shallow";

export function ToFoodTrail() {
  // const pointRef = useRef()
  const { toFoodTrail } = useSceneStore((state) => ({
    toFoodTrail: state.toFoodTrail,
  }), shallow);

  return (
    <Points limit={10000}>
      <PointMaterial
        transparent
        color="#ff0000"
        vertexColors
        size={4}
        sizeAttenuation={false}
        depthWrite={false}
      />

      {toFoodTrail.map((toFoodTrailPosition) => (
        <Point position={toFoodTrailPosition} size={4} />
      ))}
    </Points>
  );
}
