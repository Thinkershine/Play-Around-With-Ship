import React, { useState } from "react";

const isDev = false;
const blockTypes = {
  square: [["BLUE", "BLUE"], ["BLUE", "BLUE"]]
};

const colouredBoard = [
  [["GREEN"], ["r0c1"], ["r0c2"], ["BLUE"], ["BLUE"]],
  [["GREEN"], ["YELLOW"], ["YELLOW"], ["BLUE"], ["BLUE"]],
  [["GREEN"], ["GREEN"], ["YELLOW"], ["YELLOW"], ["r2c4"]],
  [["r3c0"], ["BLACK"], ["BLACK"], ["BLACK"], ["BLACK"]],
  [["r4c0"], ["r4c1"], ["r4c2"], ["r4c3"], ["r4c4"]]
];

const initialBoard = [
  [["r0c0"], ["r0c1"], ["r0c2"], ["r0c3"], ["r0c4"]],
  [["r1c0"], ["r1c1"], ["r1c2"], ["r1c3"], ["r1c4"]],
  [["r2c0"], ["r2c1"], ["r2c2"], ["r2c3"], ["r2c4"]],
  [["r3c0"], ["r3c1"], ["r3c2"], ["r3c3"], ["r3c4"]],
  [["r4c0"], ["r4c1"], ["r4c2"], ["r4c3"], ["r4c4"]]
];

const Tetris = () => {
  const [board, setBoardSize] = useState(isDev ? initialBoard : colouredBoard);

  const drawBlock = color => {
    console.log("DRAW BLOCK COLOR", color[0]);
    let blockColor = { backgroundColor: "red" };
    switch (color[0]) {
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
      <div className="block" style={blockColor}>
        <p
          style={{
            color: "black",
            height: 25,
            width: 25,
            margin: 0,
            padding: 0
          }}
        >
          {isDev ? color : ""}
        </p>
      </div>
    );
  };

  const drawBoard = () => {
    console.log("DRAWING ROW");
    let row = [];

    const rowStyle = {
      width: 200,
      height: 20,
      margin: 5,
      color: "black",
      zIndex: 100,
      overflow: "hidden"
    };

    const colStyle = {
      width: 25,
      height: 25,
      marginLeft: 5,
      marginRight: 5,
      color: "black",
      zIndex: 100,
      float: "left"
    };

    for (let i = 0; i < board.length; i += 1) {
      let columns = [];

      for (let j = 0; j < board[i].length; j += 1) {
        columns.push(
          <div className="col" style={colStyle}>
            {drawBlock(board[i][j])}
            {console.log(board[i][j])}
          </div>
        );
      }
      row.push(
        <div className="row" style={rowStyle}>
          {columns.map(column => column)}
        </div>
      );
    }

    return row;
  };

  return (
    <div>
      <h1>Classical Blocks Game</h1>
      <div
        id="board"
        style={{
          position: "relative",
          left: 10,
          top: 20,
          width: 200,
          height: 200,
          backgroundColor: "rgba(150, 150, 255, 0.2)"
        }}
      >
        {drawBoard()}
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
