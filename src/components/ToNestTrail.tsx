import { useRef, useState } from "react";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSceneStore } from "../store/useSceneStore";
import { shallow } from "zustand/shallow";

export function ToNestTrail() {
  // const pointRef = useRef()
  const { toNestTrail } = useSceneStore(
    (state) => ({ toNestTrail: state.toNestTrail }),
    shallow
  );

  return (
    <Points limit={10000}>
      <PointMaterial
        transparent
        color="#2222ff"
        vertexColors
        size={4}
        sizeAttenuation={false}
        depthWrite={false}
      />

      {toNestTrail.map((toNestTrailPosition) => (
        <Point position={toNestTrailPosition} size={4} />
      ))}
    </Points>
  );
}
