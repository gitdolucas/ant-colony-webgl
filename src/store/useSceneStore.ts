import { create } from "zustand";
type TUseSceneStore = {
  pheromoneTrailMatrix: number[][];
  setPheromoneTrailMatrix: (row: number, col: number, val: number) => void;
  foodSource: number[][];
  setNewFoodSource: (foodPosition: number[]) => void;
  toFoodTrail: number[][];
  setNewToFoodTrail: (toFoodTrailPosition: number[]) => void;
  toNestTrail: number[][];
  setNewToNestTrail: (toNestTrailPosition: number[]) => void;
};
export const useSceneStore = create<TUseSceneStore>((set) => ({
  pheromoneTrailMatrix: [...Array(90).keys()].map((row) =>
    [...Array(90).keys()].map((column) => 1)
  ),
  setPheromoneTrailMatrix: (row: number, col: number, val: number) =>
    set((state) => {
      state.pheromoneTrailMatrix[row][col] = val;
      return { pheromoneTrailMatrix: state.pheromoneTrailMatrix };
    }),
  foodSource: [],
  setNewFoodSource: (foodPosition: number[]) =>
    set((state) => ({ foodSource: [...state.foodSource, foodPosition] })),

  toFoodTrail: [],
  setNewToFoodTrail: (toFoodTrailPosition: number[]) =>
    set((state) => ({
      toFoodTrail: [...state.toFoodTrail, toFoodTrailPosition],
    })),

  toNestTrail: [],
  setNewToNestTrail: (toNestTrailPosition: number[]) =>
    set((state) => ({
      toNestTrail: [...state.toNestTrail, toNestTrailPosition],
    })),
}));
