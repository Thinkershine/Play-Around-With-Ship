import React, { useState, useEffect, useReducer } from "react";

const isDev = false;
const isPlaying = false;
const blocksFallingSpeed = 1000;

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
  console.log("BOARD STATE", state.gameBoard);

  switch (action.type) {
    case "NEW_BLOCK":
      console.log("CURRENT BLOCK", action.payload.currentBlock);
      let currentBlock = action.payload.currentBlock;
      state.currentBlock = currentBlock;

      const initialRow = 0;
      const initialCol = 2;
      let row = initialRow;
      let col = initialCol;
      let currentBlockSize = currentBlock.length;
      let firstBlockPiece = 0;
      let gameBoard = state.gameBoard;

      // Update GameBoard
      for (let blockPiece = 0; blockPiece < currentBlockSize; blockPiece += 1) {
        if (blockPiece === firstBlockPiece) {
          gameBoard[row][col] = {
            color: currentBlock[0].color,
            index: gameBoard[row][col].index
          };
        } else {
          row = initialRow + currentBlock[blockPiece].row;
          col = initialCol + currentBlock[blockPiece].col;
          gameBoard[row][col] = {
            color: currentBlock[blockPiece].color,
            index: gameBoard[row][col].index
          };
        }

        // Update CurrentBlock
        currentBlock[blockPiece] = {
          color: currentBlock[0].color,
          row: row,
          col: col
        };

        console.log("BLOCK ROW ", row, "BLOCK COL ", col);
      }
      return { ...state, currentBlock: currentBlock };
    case "MOVE_BLOCKS":
      const firstRow = 0;
      const lastRow = state.gameBoard.length;
      // update blocks positions
      for (let row = 0; row < state.gameBoard.length; row += 1) {
        for (let col = 0; col < state.gameBoard[0].length; col += 1) {
          if (state.gameBoard[row][col].color !== "EMPTY" && row === 0) {
            state.gameBoard[row][col].color = "EMPTY";
          }
          if (row !== firstRow) {
            if (state.gameBoard[row - 1][col].color !== "EMPTY") {
              // If above this space is block visible >>> FALL IT DOWN

              state.gameBoard[row][col].color =
                state.gameBoard[row - 1][col].color;
              state.gameBoard[row - 1][col].color = "EMPTY";

              // check if below is free spot!
              // ++ CHECK ALL BLOCK IF IT's NOT TOUCHING ANYTHING
            }
          }
        }
      }

      return state;
    case "MOVE_BLOCK_DOWN":
      gameBoard = state.gameBoard;
      currentBlock = state.currentBlock;

      // #1 Check if block can move
      let canMove = checkIfBlockCanMove(gameBoard, currentBlock, "DOWN");
      console.log("BLOCK ", canMove ? "CAN MOVE" : "CAN'T MOVE", "DOWN");

      // if can't move ??

      // if hit -> Game Over ?

      console.log("CURRENT BLOCK AT MOVE DOWN", state.currentBlock);

      // Update CurrentBlock
      // later updated BLock??

      let updatedBlock = state.currentBlock;
      //// Check for Collisions
      ////// Check for Left & Right Collision
      ////// Check for Last Row

      for (let i = 0; i < updatedBlock.length; i += 1) {
        if (updatedBlock[i].row !== gameBoard.length) {
          // Check if Block Under is Empty
          if (gameBoard[i + 1][updatedBlock[i].col].color === "EMPTY") {
            updatedBlock[i].row += 1;
          } else {
            console.log(
              "BLOCK UNDER IS TAKEN",
              gameBoard[i + 1][updatedBlock[i].col]
            );
          }
        } else {
          console.log(
            "BLOCK HITTED BOTTOM",
            updatedBlock[i].row,
            "BOARD BOTTOM ROW",
            gameBoard.length
          );
        }

        // UPDATE GameBoard
        for (let i = 0; i < updatedBlock.length; i += 1) {
          let updatedBlockRow = updatedBlock[i].row;
          let updatedBlockCol = updatedBlock[i].col;

          gameBoard[updatedBlockRow][updatedBlockCol] = {
            color: updatedBlock[i].color,
            index: gameBoard[updatedBlockRow][updatedBlockCol].index
          };

          // Update GameBoard
          // clear old blocks
          gameBoard = cleanBoard(gameBoard, updatedBlock);

          if (i !== 0) {
            gameBoard[updatedBlockRow - 1][updatedBlockCol] = {
              color: "EMPTY",
              index: gameBoard[updatedBlockRow][updatedBlockCol].index
            };
          }

          // color board with new updatedBlock
          gameBoard = updateBoard(gameBoard, updatedBlock);
        }
      }
      console.log("UPDATED CURRENT BLOCK ", updatedBlock);
      return { ...state, currentBlock: updatedBlock };
    default:
      return state;
  }
};

const checkIfBlockCanMove = (board, block, direction) => {
  console.log("CHECK IF BLOCK CAN MOVE DIRECTION : ", direction);
  let canMove = false;
  let blockSize = block.length;

  switch (direction) {
    case "DOWN":
      let lastRow = board.length;

      console.log("BLOCK SIZE", blockSize);
      for (let blockPiece = 0; blockPiece < blockSize; blockPiece += 1) {
        let boardBelowIsOkToMove = checkBoardBelow(board, block[blockPiece]);
        if (boardBelowIsOkToMove) {
          if (boardBelowIsOkToMove) {
            let boardBelowColor =
              board[blockPiece.row + 1][blockPiece.col].color;
            if (boardBelowColor === blockPiece.color) {
              for (let i = 0; i < blockSize; i += 1) {
                if (
                  blockPiece.row ===
                    board[blockPiece.row + 1][blockPiece.col].row &&
                  blockPiece.col ===
                    board[blockPiece.row + 1][blockPiece.col].col
                ) {
                  // check if below isn't part of this block...
                  console.log("IT'S THE SAME BLOCK!");
                  // get board specific x & y and block x & y
                  // are they equal?
                }
              }
            }
          }
        }
      }

      return canMove;
    default:
      console.log("WRONG DATA @ checkIfBlockCanMove");
      return new Error();
  }
};

const checkBoardBelow = (board, blockPiece) => {
  console.log("BLOCK PIECE AT cHECK BELOW ", blockPiece);
  let lastRow = board.length;
  let nextRow = blockPiece.row + 1;

  if (nextRow >= lastRow) {
    console.log(
      "LAST ROW - CAN'T MOVE",
      blockPiece.row + " : " + blockPiece.col
    );
    return false;
  } else {
    let nextRowColor = board[blockPiece.row + 1][blockPiece.col].color;
    if (nextRowColor !== "EMPTY") {
      console.log(
        "NOT EMPTY CAN'T MOVE",
        blockPiece.row + " : " + blockPiece.col
      );
      return false;
    }
    return true;
  }
};

const cleanBoard = (board, block) => {
  //   console.log("CLEAN BOARD");
  return board;
};

const updateBoard = (board, block) => {
  //   console.log("UPDATE BOARD");
  return board;
};

const Tetris = () => {
  const [gameState, setGameState] = useState({
    currentBlock: [],
    newBlockRendered: false
  });

  const [drawnBoard, setDrawnBoard] = useState([]);
  const [state, dispatchBoard] = useReducer(boardReducer, {
    gameBoard: initialBoard,
    currentBlock: []
  });
  const [nextBlock, setNextBlock] = useState(blockTypes.pBlock);

  useEffect(() => {
    let playTimer = setInterval(moveBlocks, blocksFallingSpeed);
    return () => {
      clearInterval(playTimer);
    };
  });

  const moveBlocks = () => {
    if (!gameState.newBlockRendered) {
      newBlock();
    } else {
      dispatchBoard({
        type: "MOVE_BLOCK_DOWN"
      });
    }
    drawBoard();
  };

  const newBlock = () => {
    dispatchBoard({
      type: "NEW_BLOCK",
      payload: { currentBlock: nextBlock }
    });

    setGameState({
      currentBlock: nextBlock,
      newBlockRendered: true
    });
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

    for (let i = 0; i < state.gameBoard.length; i += 1) {
      let columns = [];

      for (let j = 0; j < state.gameBoard[i].length; j += 1) {
        // console.log("DRAW COL ", j, " ROW ", i);
        columns.push(
          <div key={"col" + j} className="col" style={boardStyles.colStyle}>
            {drawBlock(state.gameBoard[i][j])}
            {/* {console.log("BOARD PIECE", board[i][j])} */}
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

  const drawBlock = block => {
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
