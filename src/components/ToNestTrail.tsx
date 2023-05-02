import { useRef, useState, useEffect } from "react";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { PointsProps, useFrame, useThree } from "@react-three/fiber";
import { useSceneStore } from "../store/useSceneStore";
import { shallow } from "zustand/shallow";
import { SCENE_CONFIG } from "../scenes/sceneConfig";

export function ToNestTrail({ trailRef }) {
  const pointsRef = useRef<PointsProps>();
  const {clock} = useThree();
  const [tick, setTick] = useState(0); // add state variable and setter function

  useEffect(() => {
    setInterval(() => {
        setTick(clock.elapsedTime);
    }, 300);
  }, []);

  useFrame(() => {
    trailRef = trailRef.map((row, i) =>
      row.map((col, j) => trailRef[i][j] - 1)
    );
    // console.log(trailRef);
  });
  //   return <></>;
  return (
    <Points
      ref={pointsRef}
    //   key={tick}

      limit={
        SCENE_CONFIG.GRID_SIZE *
        SCENE_CONFIG.GRID_SIZE *
        SCENE_CONFIG.TRAIL_RESOLUTION
      }
    >
      <PointMaterial
        // transparent
        color="#2222ff"
        vertexColors
        size={2}
      key={tick}

        // sizeAttenuation={false}
        // depthWrite={false}
      />

      {tick && trailRef?.map((row, i) =>
        row.map(
          (col, j) =>
            trailRef[i][j] > 1 && (
              <Point
                key={`${i}-${j}`}
                position={[
                  i -
                    (SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION) /
                      2 +
                    0.5,
                  j -
                    (SCENE_CONFIG.GRID_SIZE * SCENE_CONFIG.TRAIL_RESOLUTION) /
                      2 +
                    0.5,
                  0,
                ]}
                scale={trailRef[i][j]}
                size={4}
              />
            )
        )
      )}
    </Points>
  );
}
