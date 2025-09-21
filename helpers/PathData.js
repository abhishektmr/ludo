import { Colors } from "../constants/Colors";

export const Path1Data = [
  { id: 5 },
  { id: 115, color: Colors.red },
  { id: 45 },
  { id: 4 },
  { id: 114, color: Colors.red },
  { id: 46 },
  { id: 3 },
  { id: 113, color: Colors.red },
  { id: 47 },
  { id: 2 },
  { id: 112, color: Colors.red },
  { id: 48, isSafePoint: true },
  { id: 1, color: Colors.red },
  { id: 111, color: Colors.red },
  { id: 49 },
  { id: 52 },
  { id: 51, isArrowPoint: true, arrowColor: Colors.red },
  { id: 50 },
];

export const Path2Data = [
  { id: 13 },
  { id: 14, color: Colors.green },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 12, isArrowPoint: true, arrowColor: Colors.green },
  { id: 221, color: Colors.green },
  { id: 222, color: Colors.green },
  { id: 223, color: Colors.green },
  { id: 224, color: Colors.green },
  { id: 225, color: Colors.green },
  { id: 11 },
  { id: 10 },
  { id: 9, isSafePoint: true },
  { id: 8 },
  { id: 7 },
  { id: 6 },
];

export const Path3Data = [
  { id: 24 },
  { id: 25, isArrowPoint: true, arrowColor: Colors.blue },
  { id: 26 },
  { id: 23 },
  { id: 331, color: Colors.blue },
  { id: 27, color: Colors.blue },
  { id: 22, isSafePoint: true },
  { id: 332, color: Colors.blue },
  { id: 28 },
  { id: 21 },
  { id: 333, color: Colors.blue },
  { id: 29 },
  { id: 20 },
  { id: 334, color: Colors.blue },
  { id: 30 },
  { id: 19 },
  { id: 335, color: Colors.blue },
  { id: 31 },
];

export const Path4Data = [
  { id: 32 },
  { id: 33 },
  { id: 34 },
  { id: 35, isSafePoint: true },
  { id: 36 },
  { id: 37 },
  { id: 445, color: Colors.yellow },
  { id: 444, color: Colors.yellow },
  { id: 443, color: Colors.yellow },
  { id: 442, color: Colors.yellow },
  { id: 441, color: Colors.yellow },
  { id: 38, isArrowPoint: true, arrowColor: Colors.yellow },
  { id: 44 },
  { id: 43 },
  { id: 42 },
  { id: 41 },
  { id: 40, color: Colors.yellow },
  { id: 39 },
];

export const SafeSpots = [1, 9, 14, 22, 27, 35, 40, 48];

export const StarSpots = [9, 22, 35, 48];

export const ArrowSpot = [12, 51, 38, 25];
export const turningPoints = [52, 13, 26, 39];
export const victoryStart = [111, 221, 331, 441];

export const startingPoints = [1, 14, 27, 40];

export const colorPlayer = [
  Colors.red,
  Colors.green,
  Colors.yellow,
  Colors.blue,
];
