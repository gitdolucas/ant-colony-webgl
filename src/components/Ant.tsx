import { Point } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Mesh } from "three";
import { useSceneStore } from "../store/useSceneStore";

export function Ant({ position, gridSize }) {
  const foodSource = useSceneStore((state) => state.foodSource);
  const setNewToFoodTrail = useSceneStore((state) => state.setNewToFoodTrail);
  const setNewToNestTrail = useSceneStore((state) => state.setNewToNestTrail);

  const isCarringFood = useRef<boolean>(false);
  const pointRef = useRef<Mesh>();
  const angleRef = useRef(Math.random() * 360);
  useEffect(()=>{
    setInterval(()=>{
      const position = pointRef.current?.position;
      if(isCarringFood.current){
        setNewToNestTrail(position);

      } else {
        setNewToFoodTrail(position);
      }
    }, 150);
  }, []);

  useFrame(({ clock }) => {
    if (!pointRef) return;

    let newX = pointRef.current.position.x + Math.cos(angleRef.current) * 0.1;
    let newY = pointRef.current.position.y + Math.sin(angleRef.current) * 0.1;
    const position = pointRef.current?.position;
    if (
      newX + 0.1 >= gridSize / 2 ||
      newX - 0.1 <= -gridSize / 2 ||
      newY + 0.1 >= gridSize / 2 ||
      newY - 0.1 <= -gridSize / 2
    ) {
      // getting outside the grid
      steer(Math.random() * 360);
    } else {
      const visibleFood = foodSource
        .filter((pos) => pointRef.current?.position.distanceTo(pos) < 3)
        .splice(0, 1);
      // console.log
      if (visibleFood.length > 0 && !isCarringFood.current) {
        const target =
          visibleFood.length === 0
            ? visibleFood[0]
            : visibleFood?.sort(
                (a, b) =>
                  pointRef.current?.position.distanceTo(a) -
                  pointRef.current?.position.distanceTo(b)
              )[0];
        // const angleToFood = position?.angleTo(target)
        // console.log(target, position)
        const signedAngleToFood = Math.atan2(
          target.y - position.y,
          target.x - position.x
        );
        // console.log(signedAngleToFood)
        setAngle(signedAngleToFood);
        if (position?.distanceTo(target) < 0.1) {
          isCarringFood.current = true;
          angleRef.current += 180 * Math.PI /180
        }
      } else {
        steer((Math.random() - 0.5) * 360 * 0.001);
      }
      pointRef.current.position.x = newX;
      pointRef.current.position.y = newY;
    }
  });

  const steer = (rad: number) => {
    angleRef.current = angleRef.current + rad;
  };
  const setAngle = (rad: number) => (angleRef.current = rad);

  // const sense = (subject, wherePosition) => {

  // }

  return (
    <Point
      position={position}
      ref={pointRef}
      size={10}
      color={isCarringFood.current ? "yellow" : "#999"}
    />
  );
}
