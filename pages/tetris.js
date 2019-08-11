import React, { useState, useEffect, useReducer } from "react";

const isDev = false;
const isPlaying = false;

const blockTypes = {
  square: [
    { color: "BLUE" },
    { color: "BLUE" },
    { color: "BLUE" },
    { color: "BLUE" }
  ]
};

const emptyBoard = [
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]
];

const colouredBoard = [
  [
    { color: "GREEN", index: "r0c0" },
    { color: "EMPTY", index: "r0c1" },
    { color: "EMPTY", index: "r0c2" },
    { color: "BLUE", index: "r0c3" },
    { color: "BLUE", index: "r0c4" }
  ],
  ["GREEN", "YELLOW", "YELLOW", "BLUE", "BLUE"],
  ["GREEN", "GREEN", "YELLOW", "YELLOW", "EMPTY"],
  ["EMPTY", "BLACK", "BLACK", "BLACK", "BLACK"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]
];

const initialBoard = [
  [
    { color: "EMPTY", index: "r0c0" },
    { color: "EMPTY", index: "r0c1" },
    { color: "EMPTY", index: "r0c2" },
    { color: "EMPTY", index: "r0c3" },
    { color: "EMPTY", index: "r0c4" }
  ],
  [
    { color: "EMPTY", index: "r1c0" },
    { color: "EMPTY", index: "r1c1" },
    { color: "EMPTY", index: "r1c2" },
    { color: "EMPTY", index: "r1c3" },
    { color: "EMPTY", index: "r1c4" }
  ],
  [
    { color: "EMPTY", index: "r2c0" },
    { color: "EMPTY", index: "r2c1" },
    { color: "EMPTY", index: "r2c2" },
    { color: "EMPTY", index: "r2c3" },
    { color: "EMPTY", index: "r2c4" }
  ],
  [
    { color: "EMPTY", index: "r3c0" },
    { color: "EMPTY", index: "r3c1" },
    { color: "EMPTY", index: "r3c2" },
    { color: "EMPTY", index: "r3c3" },
    { color: "EMPTY", index: "r3c4" }
  ],
  [
    { color: "EMPTY", index: "r4c0" },
    { color: "EMPTY", index: "r4c1" },
    { color: "EMPTY", index: "r4c2" },
    { color: "EMPTY", index: "r4c3" },
    { color: "EMPTY", index: "r4c4" }
  ]
];

const boardReducer = (state, action) => {
  console.log("STATE AT REDUCER", state[0][2]);
  console.log("PAYLOAD TO SET", action.payload.currentBlock[0].color);

  console.log("STATE", state);
  //   let newBoard = state.map(block => block);
  //   newBoard[0][2] = action.payload.currentBlock[0][0];
  //   console.log("NEW BOARD", newBoard);
  //   (state[0][2] = action.payload.currentBlock[0][0]);
  switch (action.type) {
    case "NEW_BLOCK":
      state[0][2] = {
        color: action.payload.currentBlock[0].color,
        index: state[0][2].index
      };
      //   console.log("SPREADED STATE ", ...state);
      return state;
    default:
      return state;
  }
};

const Tetris = () => {
  const startingBoard = isDev
    ? initialBoard
    : isPlaying
    ? emptyBoard
    : colouredBoard;
  const [drawnBoard, setDrawnBoard] = useState([]);
  const [board, dispatchBoard] = useReducer(boardReducer, initialBoard); // change to programmatic board
  const [nextBlock, setNextBlock] = useState(blockTypes.square);
  useEffect(() => {
    let playTimer = setInterval(moveBlocks, 2000);
    return () => {
      clearInterval(playTimer);
    };
  });

  const moveBlocks = () => {
    console.log("BLOCKS MOVING NEW BOARD >", board);
    dispatchBoard({
      type: "NEW_BLOCK",
      payload: { currentBlock: nextBlock }
    });
    drawBoard();
  };

  const drawBlock = block => {
    console.log("DRAW BLOCK COLOR", block.color);
    let blockColor = { backgroundColor: "red" };
    switch (block.color) {
      case "GREEN":
        blockColor = { backgroundColor: "green" };
        break;
      case "RED":
        blockColor = { backgroundColor: "red" };
        break;
      case "YELLOW":
        blockColor = { backgroundColor: "yellow" };
        break;
      case "BLUE":
        blockColor = { backgroundColor: "blue" };
        break;
      case "BLACK":
        blockColor = { backgroundColor: "black" };
        break;
      default:
        blockColor = { backgroundColor: "transparent" };
        break;
    }

    console.log("AFTER COLOURING", blockColor);
    return (
      <div key={block.index} className="block" style={blockColor}>
        <p
          style={{
            color: "black",
            height: 25,
            width: 25,
            margin: 0,
            padding: 0
          }}
        >
          {isDev ? blockColor : ""}
        </p>
      </div>
    );
  };

  const boardStyles = {
    boardStyle: {
      position: "relative",
      left: 10,
      top: 20,
      width: 200,
      height: 200,
      backgroundColor: "rgba(150, 150, 255, 0.2)"
    },
    rowStyle: {
      width: 200,
      height: 20,
      margin: 5,
      color: "black",
      zIndex: 100,
      overflow: "hidden"
    },
    colStyle: {
      width: 25,
      height: 25,
      marginLeft: 5,
      marginRight: 5,
      color: "black",
      zIndex: 100,
      float: "left"
    }
  };

  const drawBoard = () => {
    console.log("DRAWING BOARD");
    const redrawnBoard = [];

    console.log("UHG", board.length);
    for (let i = 0; i < board.length; i += 1) {
      let columns = [];

      for (let j = 0; j < board[i].length; j += 1) {
        console.log("DRAWING COLUMN ", j, "INSIDE ROW ", i);
        columns.push(
          <div key={"col" + j} className="col" style={boardStyles.colStyle}>
            {drawBlock(board[i][j])}
            {console.log("BOARD PIECE", board[i][j])}
          </div>
        );
      }
      {
        console.log("DRAWING ROW", i);
      }
      redrawnBoard.push(
        <div key={"row" + i} className="row" style={boardStyles.rowStyle}>
          {columns.map(column => column)}
        </div>
      );
    }

    setDrawnBoard(redrawnBoard);
  };

  return (
    <div>
      <h1>Classical Blocks Game</h1>
      <div id="board" style={boardStyles.boardStyle}>
        {drawnBoard}
      </div>
      <style jsx>
        {`
          .block {
            width: 25px;
            height: 25px;
            margin-left: 5px;
            margin-right: 5px;
            z-index: 150;
          }
        `}
      </style>
    </div>
  );
};

export default Tetris;
