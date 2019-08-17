import React, { useState, useReducer, useRef, useEffect } from "react";

const playerReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_LEFT":
      console.log("MOVE LEFT : STAT POS", state.pos);
      return { ...state, pos: { x: action.payload.x, y: state.pos.y } };
    case "MOVE_RIGHT":
      console.log("MOVE RIGHT : STAT POS", state.pos);
      return { ...state, pos: { x: action.payload.x, y: state.pos.y } };
    case "ROTATE":
      console.log("ROTATE");
      return;
    case "DROP":
      console.log("DROP");
      return;
    default:
      return new Error();
  }
};

const TetrisAnother = () => {
  const board = useRef(null);
  const [drawingBoardContext, setDrawingBoardContext] = useState();

  const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

  const [player, dispatchPlayer] = useReducer(playerReducer, {
    pos: { x: 5, y: 5 },
    matrix: matrix
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  useEffect(() => {
    const canvas = board.current;
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    setDrawingBoardContext(context);
  }, []);

  useEffect(() => {
    let update = setInterval(draw, 1000);
    return () => clearInterval(update);
  });

  const draw = () => {
    drawMatrix(matrix, player.pos);
  };

  const drawMatrix = (matrix, offset) => {
    console.log("DRAW MATRIX", matrix, "OFFSET", offset);
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        console.log("X + OFFSETX", x + offset.x);
        if (value !== 0) {
          drawingBoardContext.fillStyle = "red";
          drawingBoardContext.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  };

  const handleKeyPress = event => {
    switch (event.keyCode) {
      case 37:
        dispatchPlayer({
          type: "MOVE_LEFT",
          payload: {
            x: player.pos.x - 1
          }
        });
        break;
      case 38:
        dispatchPlayer({
          type: "ROTATE",
          payload: {
            direction: "ROTATE"
          }
        });
        break;
      case 39:
        dispatchPlayer({
          type: "MOVE_RIGHT",
          payload: {
            x: player.pos.x + 1
          }
        });

        break;
      case 40:
        dispatchPlayer({
          type: "DROP",
          payload: {
            direction: "DROP"
          }
        });

        break;
      default:
        console.log("Other Key", event.key, "Key Code", event.keyCode);
        break;
    }
  };

  return (
    <div>
      <h1>Tetris Another Way</h1>
      <canvas width="240" height="400" ref={board} />
    </div>
  );
};

export default TetrisAnother;
