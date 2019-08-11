import React, { useState, useEffect, useReducer } from "react";

const isDev = false;
const isPlaying = false;

const blockTypes = {
  square: [
    { color: "BLUE", row: 0, col: 0 },
    { color: "BLUE", row: 0, col: 1 },
    { color: "BLUE", row: 1, col: 0 },
    { color: "BLUE", row: 1, col: 1 }
  ],
  line: [
    { color: "BLACK", row: 0, col: 0 },
    { color: "BLACK", row: 1, col: 0 },
    { color: "BLACK", row: 2, col: 0 },
    { color: "BLACK", row: 3, col: 0 }
  ],
  lBlock: [
    { color: "RED", row: 0, col: 0 },
    { color: "RED", row: 1, col: 0 },
    { color: "RED", row: 2, col: 0 },
    { color: "RED", row: 2, col: 1 }
  ],
  zBlock: [
    { color: "YELLOW", row: 0, col: 0 },
    { color: "YELLOW", row: 0, col: 1 },
    { color: "YELLOW", row: 1, col: 1 },
    { color: "YELLOW", row: 1, col: 2 }
  ],
  pBlock: [
    { color: "BLUE", row: 0, col: 0 },
    { color: "BLUE", row: 1, col: -1 },
    { color: "BLUE", row: 1, col: 0 },
    { color: "BLUE", row: 1, col: 1 }
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

const boardReducer = (board, action) => {
  console.log("STATE AT REDUCER", board[0][2]);
  console.log("PAYLOAD TO SET", action.payload.currentBlock[0].color);

  console.log("STATE", board);
  //   let newBoard = state.map(block => block);
  //   newBoard[0][2] = action.payload.currentBlock[0][0];
  //   console.log("NEW BOARD", newBoard);
  //   (state[0][2] = action.payload.currentBlock[0][0]);

  switch (action.type) {
    case "NEW_BLOCK":
      const currentBlock = action.payload.currentBlock;
      const initialRow = 0;
      const initialCol = 2;
      let row = initialRow;
      let col = initialCol;

      for (let i = 0; i < currentBlock.length; i += 1) {
        if (i === 0) {
          board[row][col] = {
            color: currentBlock[0].color,
            index: board[row][col].index
          };

          // update block
        } else {
          row = initialRow + currentBlock[i].row;
          col = initialCol + currentBlock[i].col;
          console.log("BLOCK ROW ", row, "BLOCK COL ", col);
          board[row][col] = {
            color: currentBlock[i].color,
            index: board[row][col].index
          };
        }
      }
      //   console.log("SPREADED STATE ", ...state);
      return board;
    default:
      return board;
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
  const [nextBlock, setNextBlock] = useState(blockTypes.pBlock);
  useEffect(() => {
    let playTimer = setInterval(moveBlocks, 5000);
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
    // console.log("DRAW BLOCK COLOR", block.color);
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

    // console.log("AFTER COLOURING", blockColor);
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
    const redrawnBoard = [];

    for (let i = 0; i < board.length; i += 1) {
      let columns = [];

      for (let j = 0; j < board[i].length; j += 1) {
        console.log("DRAW COL ", j, " ROW ", i);
        columns.push(
          <div key={"col" + j} className="col" style={boardStyles.colStyle}>
            {drawBlock(board[i][j])}
            {console.log("BOARD PIECE", board[i][j])}
          </div>
        );
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
