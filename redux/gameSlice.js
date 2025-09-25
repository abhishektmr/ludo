import { createSlice } from "@reduxjs/toolkit";
import { SafeSpots } from "../helpers/PathData";
import { getUpdatedPawn, nextPlayerId } from "../util/gameUtils";
import gameInitialState from "./initialState";

const gameSlice = createSlice({
  name: "game",
  initialState: gameInitialState,
  reducers: {
    resetGame: (state) => {
      console.log("inside resetGame of game slice ");
      // Loop over all keys in initialState and reset them
      Object.keys(gameInitialState).forEach((key) => {
        state[key] = gameInitialState[key];
      });
      console.log("exiting resetGame of game slice ");
    },

    rollDice: (state) => {
      console.log("inside rollDice of game slice ");
      const diceResult = Math.floor(Math.random() * 6) + 1;
      console.log(`Dice rolled: ${diceResult}`);
      state.diceRollResult = diceResult;
      state.diceRollId = (state.diceRollId || 0) + 1;
      state.isDiceRolled = true;

      const currentPlayerId = state.currentPlayerId;
      if(diceResult !== 6) {
        const currentPlayerIndex = state.players.findIndex(p => p.id === currentPlayerId);
        const movablePawns = state.players[currentPlayerIndex].pawns.some(p => p.moves > 0 && p.moves + diceResult < 57);
        if(!movablePawns) { // no movable pawns
          state.currentPlayerId = nextPlayerId(state.currentPlayerId);
          state.isDiceRolled = false;
        }
      } else { // if dice result is 6
        state.currentPlayerId = currentPlayerId; // keep current player same as before. Do not change turn
      }
      console.log("exiting rollDice of game slice ");
    },

    movePawn: (state, action) => {
      console.log("inside movePawn of game slice ");
      const { playerId, pawnId } = action.payload;
      const steps = state.diceRollResult;

      if (playerId !== state.currentPlayerId) {
        console.error(`It's not the player ${playerId}'s turn`);
        return;
      }
      const playerIndex = state.players.findIndex((p) => p.id === playerId);
      if (playerIndex === -1) {
        console.error(`Player ${playerId} not found`);
        return;
      }
      const pawnIndex = state.players[playerIndex].pawns.findIndex(
        (p) => p.id === pawnId
      );
      if (pawnIndex === -1) {
        console.error(`Pawn ${pawnId} not found`);
        return;
      }
      const pawn = state.players[playerIndex].pawns[pawnIndex];
      console.info(`Found pawn ${pawnId} for player ${playerId}`);

      const updatedMovingPawn = getUpdatedPawn(pawn, steps, playerId);
      console.info(`Updated pawn ${pawnId}:`, updatedMovingPawn);

      state.players[playerIndex].pawns = [
        ...state.players[playerIndex].pawns.slice(0, pawnIndex),
        updatedMovingPawn,
        ...state.players[playerIndex].pawns.slice(pawnIndex + 1),
      ];
      console.log(`Moved pawn ${updatedMovingPawn.id} of player ${playerId} by ${steps} steps. Total steps ${updatedMovingPawn.moves}`);

      // Check if pawn completed 57 moves
      if (updatedMovingPawn.moves === 57) {
        // Optionally, mark pawn as finished or update player status here
        // updatedMovingPawn.finished = true;
        console.log(`Pawn ${pawnId} of player ${playerId} has completed!`);
        const areAllPawnsFinished = state.players[playerIndex].pawns.every((p) => p.moves === 57);
        if (areAllPawnsFinished) {
          state.winner = playerId;
          state.fireWorks = true;
          console.log(`Player ${playerId} has won the game!`);
          state.currentPlayerId = nextPlayerId(state.currentPlayerId);
        }
        state.isDiceRolled = false;
        console.log(`Exiting movePawn of game slice. isDiceRolled is set to ${state.isDiceRolled}`);
        return;
      }

      // Check for kill
      let isKill = false;
      const newTileId = updatedMovingPawn.tileId;
      // Only check kills on main board and tile is not a safe spot
      if (newTileId <= 52 && !SafeSpots.includes(newTileId)) {
        const allPawns = state.players.flatMap((p) => p.pawns);
        const pawnsOnNewTile = allPawns.filter(
          (p) =>
            p.tileId === newTileId &&
            p.id !== updatedMovingPawn.id &&
            p.color !== updatedMovingPawn.color
        );

        // from the pawnsOnNewTile, create a list where each player is mapped to its pawns that are present in pawnsOnNewTile
        // example = [{playerId: 2, pawns: [pawn1, pawn2]}, {playerId: 3, pawns: [pawn3]}]
        const pawnsKilledForPlayer = state.players
          .filter((player) => player.id !== playerId)
          .map((player) => {
            const pawnsForPlayer = pawnsOnNewTile.filter((pawnOnTile) =>
              player.pawns.some((pawn) => pawn.id === pawnOnTile.id)
            );
            return { playerId: player.id, pawns: pawnsForPlayer };
          });

        const actualPawnsKilledForPlayer = pawnsKilledForPlayer.find((obj) => obj.pawns.length === 1);
        if (actualPawnsKilledForPlayer) {
          isKill = true;
          const killedPawn = actualPawnsKilledForPlayer.pawns[0];
          const killedPlayerIndex = state.players.findIndex((p) => p.id === actualPawnsKilledForPlayer.playerId);
          const killedPawnIndex = state.players[killedPlayerIndex].pawns.findIndex((p) => p.id === killedPawn.id);
          const updatedKilledPawn = getUpdatedPawn(killedPawn, steps, actualPawnsKilledForPlayer.playerId, true);
          state.players[killedPlayerIndex].pawns = [
            ...state.players[killedPlayerIndex].pawns.slice(0, killedPawnIndex),
            updatedKilledPawn,
            ...state.players[killedPlayerIndex].pawns.slice(killedPawnIndex + 1),
          ];
          console.log(
            `Pawn ${killedPawn.id} of player ${actualPawnsKilledForPlayer.playerId} killed by player ${playerId}`
          );
        }
      }
      // If no kill and diceRollResult is not 6, move to next player
      if(!isKill && steps !== 6) {
        state.currentPlayerId = nextPlayerId(state.currentPlayerId);
      }
      state.isDiceRolled = false;
      console.log(`Exiting movePawn of game slice. isDiceRolled is set to ${state.isDiceRolled}`);
    }
  }
});

export default gameSlice.reducer;
export const {
  resetGame,
  movePawn,
  rollDice,
  setIsDiceRolled,
  setCurrentPlayerId,
  endTurn,
} = gameSlice.actions;
