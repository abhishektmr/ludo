const createPawns = (color, prefix) => [
    { id: `${prefix}1`, tileId: 0, moves: 0, color: color, onHomePath: false, isKilled: false },
    { id: `${prefix}2`, tileId: 0, moves: 0, color: color, onHomePath: false, isKilled: false },
    { id: `${prefix}3`, tileId: 0, moves: 0, color: color, onHomePath: false, isKilled: false },
    { id: `${prefix}4`, tileId: 0, moves: 0, color: color, onHomePath: false, isKilled: false }
];

const player1Pawns = createPawns("red", "A");
const player2Pawns = createPawns("green", "B");
const player3Pawns = createPawns("blue", "C");
const player4Pawns = createPawns("yellow", "D");

const gameInitialState = {
    players: [
        { id: 1, pawns: [...player1Pawns] },
        { id: 2, pawns: [...player2Pawns] },
        { id: 3, pawns: [...player3Pawns] },
        { id: 4, pawns: [...player4Pawns] }
    ],
    currentPlayerId: 1,
    diceRollResult: 1,
    diceRollId: 0,
    isDiceRolled: false,
    winner: 0,
    fireWorks: false
};

export default gameInitialState;

