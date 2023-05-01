import {useRef} from 'react';
import { Point, PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function PheromoneVisual({ gridSize, pheromoneTrail }) {
    const pointRef = useRef()
    // useFrame(()=>{
    //     pointRef.current = 
    //     console.log(pheromoneTrail);
    // })
  return (
    <Points limit={1000000} ref={pointRef}>
      <PointMaterial
        transparent
        vertexColors
        size={5}
        sizeAttenuation={false}
        depthWrite={false}
      />

      {pheromoneTrail.current.map((trailPosition) => (
        <Point
          position={trailPosition}
          size={4}
          color={"#f00"}
        />
      ))}
    </Points>
  );
}
