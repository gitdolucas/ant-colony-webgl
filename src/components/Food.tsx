import { useRef } from "react";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Food({ foodSource }: { foodSource: number[][] }) {
  // const pointRef = useRef()
  return (
    <Points limit={10000}>
      <PointMaterial
        transparent
        color="green"
        vertexColors
        size={10}
        sizeAttenuation={false}
        depthWrite={false}
      />

      {foodSource.map((foodPoint) => (
        <Point position={foodPoint} size={4}/>
      ))}
    </Points>
  );
}
