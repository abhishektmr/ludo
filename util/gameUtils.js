import { startingPoints } from "../helpers/PathData";

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
  } else if (totalMoves > 57) {
    // Invalid move, stay in place
  } else if (pawn.onHomePath) {
    // Already on home path
    newMoves = totalMoves;
    newTileId = pawn.tileId + steps;
    onHomePath = true;
  } else if (totalMoves >= 52) {
    // Enter home path
    newMoves = totalMoves;
    newTileId = getNextTileId(pawnData.id, newMoves);
    onHomePath = true;
  } else {
    // Normal move on board
    newMoves = totalMoves;
    newTileId = (pawn.tileId + steps) % 52 || 52;
    onHomePath = false;
  }
  return { ...pawn, moves: newMoves, tileId: newTileId, onHomePath };
}
