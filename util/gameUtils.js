import { startingPoints } from "../helpers/PathData";
import bluePawn from "../assets/images/piles/blue.png";
import greenPawn from "../assets/images/piles/green.png";
import redPawn from "../assets/images/piles/red.png";
import yellowPawn from "../assets/images/piles/yellow.png";
import dimensions from "../constants/dimensions";

const { deviceWidth } = dimensions;
const size = deviceWidth/5;

export function nextPlayerId(currentPlayerId) {
  return (currentPlayerId % 4) + 1;
}

export function getNextTileId(pawnId, moves) {
  const diff = moves - 52;
  if (["A1", "A2", "A3", "A4"].includes(pawnId)) {
    return 111 + diff;
  } else if (["B1", "B2", "B3", "B4"].includes(pawnId)) {
    return 221 + diff;
  } else if (["C1", "C2", "C3", "C4"].includes(pawnId)) {
    return 331 + diff;
  } else {
    return 441 + diff;
  }
}

// Helper function for pawn movement logic
export function getUpdatedPawn(pawn, steps, playerId, isKilled = false) {
  if(isKilled) {
    return { ...pawn, moves: 0, tileId: 0, onHomePath: false, isKilled: true };
  }
  if (pawn.moves === 0) {
    return { ...pawn, moves: 1, tileId: startingPoints[playerId - 1] };
  }
  const totalMoves = pawn.moves + steps;
  let newMoves = pawn.moves;
  let newTileId = pawn.tileId;
  let onHomePath = !!pawn.onHomePath;
  if (totalMoves === 57) {
    // Pawn reaches home
    newMoves = 57;
    newTileId = null;
  } else if (totalMoves > 57) {
    // Invalid move, stay in place
    return pawn;
  } else if (pawn.onHomePath) {
    // Already on home path
    newMoves = totalMoves;
    newTileId = pawn.tileId + steps;
    onHomePath = true;
  } else if (totalMoves >= 52) {
    // Enter home path
    newMoves = totalMoves;
    newTileId = getNextTileId(pawn.id, newMoves);
    onHomePath = true;
  } else {
    // Normal move on board
    newMoves = totalMoves;
    newTileId = (pawn.tileId + steps) % 52 || 52;
    onHomePath = false;
  }
  return { ...pawn, moves: newMoves, tileId: newTileId, onHomePath };
}

export const pawnImage = (color) => {
  switch (color) {
    case "red":
      return redPawn;
    case "green":
      return greenPawn;
    case "blue":
      return bluePawn;
    case "yellow":
      return yellowPawn;
    default:
      return null;
    }
};

// Helper function for pawn placement
export const getPawnOffsets = (count) => {
  const positions = [];

  if (count === 1) {
    positions.push({ x: 0, y: 0 });
  } else if (count === 2) {
    positions.push({ x: 0, y: 5 });
    positions.push({ x: 0, y: 10 });
  } else if (count === 3) {
    positions.push({ x: -12, y: -12 });
    positions.push({ x: 12, y: -12 });
    positions.push({ x: 0, y: 12 });
  } else {
    // 4+ → arrange in a 2x2 grid
    positions.push({ x: -12, y: -12 });
    positions.push({ x: 12, y: -12 });
    positions.push({ x: -12, y: 12 });
    positions.push({ x: 12, y: 12 });
  }

  return positions;
};

export const triangleAnchors = {
  // red: { x: size / 2, y: size * 0.1 },
  // green: { x: size * 0.9, y: size / 2 },
  // blue: { x: size / 2, y: size * 0.9 },
  // yellow: { x: size * 0.1, y: size / 2 },
  red: { x: size / 2.5, y: size * .7 },
  green: { x: 0, y: size / 2.7 },
  blue: { x: size / 2.5, y: size * .5 },
  yellow: { x: 0, y: 0 },
};

// Final absolute positions for completed pawns
export const getCompletedPawnPositions = (color, count) => {
  const anchor = triangleAnchors[color];
  const offsets = getPawnOffsets(count);
  return offsets.map((o) => ({ x: anchor.x + o.x, y: anchor.y + o.y }));
};
