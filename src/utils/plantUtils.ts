import type { Plant } from '../types/powerPlants.types';

export function calculateStatePercentage(plant: Plant, stateTotal: number): number {
  if (!stateTotal || stateTotal === 0) return 0;
  return (plant.PLNGENAN / stateTotal) * 100;
}
