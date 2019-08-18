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
      console.log("DROP : STAT POS", state.pos);
      return { ...state, pos: { x: state.pos.x, y: state.pos.y + 1 } };
    case "GRAVITY":
      console.log("GRAVITY");
      return { ...state, pos: { x: state.pos.x, y: state.pos.y + 1 } };
    default:
      return new Error();
  }
};

const TetrisAnother = () => {
  const board = useRef(null);
  const [canvas, setCanvas] = useState();
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
    setCanvas(canvas);

    context.scale(20, 20);
    setDrawingBoardContext(context);
  }, []);

  useEffect(() => {
    let update = setInterval(draw, 1000);
    let gravity = setInterval(drop, 1000);
    return () => {
      clearInterval(gravity);
      clearInterval(update);
    };
  });

  const draw = () => {
    drawingBoardContext.fillStyle = "#000";
    drawingBoardContext.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(matrix, player.pos);
  };

  const drop = () => {
    dispatchPlayer({
      type: "GRAVITY"
    });
  };

  const drawMatrix = (matrix, offset) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
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
          type: "DROP"
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
