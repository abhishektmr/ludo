import { createSelector } from "@reduxjs/toolkit";

export const selectDiceRollResult = (state) => state.game.diceRollResult;
export const selectDiceRollId = (state) => state.game.diceRollId;
export const selectCurrentPlayerId = (state) => state.game.currentPlayerId;
export const selectIsDiceRolled = (state) => state.game.isDiceRolled;
export const selectWinner = (state) => state.game.winner;
export const selectAllPawns = createSelector(
    [state => state.game.players],
    (players) => players.flatMap(player => player.pawns)
)
export const selectCompletedPawns = createSelector(
    [state => state.game.players],
    (players) => {
    const pawns = { red: [], green: [], blue: [], yellow: [] };
    players.forEach(player => {
      player.pawns.forEach(pawn => {
        if (pawn.moves === 57) {
          pawns[pawn.color].push(pawn);
        }
      });
    });
    return pawns;
})