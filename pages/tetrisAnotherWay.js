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
  const [arena, setArena] = useState();
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

    setArena(createMatrix(10, 18));
  }, []);

  useEffect(() => {
    let update = setInterval(draw, 1000);
    let gravity = setInterval(drop, 1000);
    return () => {
      clearInterval(gravity);
      clearInterval(update);
    };
  });

  const collide = (arena, player) => {
    // Iterate over player
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (
          m[y][x] !== 0 &&
          (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
        ) {
          return true;
        }
      }
    }

    return false;
  };

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

  const createMatrix = (width, height) => {
    const matrix = [];
    while (height !== 0) {
      matrix.push(new Array(width).fill(0));
      height -= 1;
    }
    return matrix;
  };

  const merge = (arena, player) => {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
    setArena(arena);
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
        let bottomCollided = collide(arena, player);
        if (bottomCollided) console.log("BOTTOM COLLIDED");
        // if collided
        // move back player
        if (bottomCollided) {
          merge(arena, player);
        }
        // merge arena and player
        // playerBack to TOP -> RENDER NEW PIECE!
        if (!bottomCollided) {
          dispatchPlayer({
            type: "DROP"
          });
        }

        break;
      case 68:
        console.log("DRAW ARENA");
        console.table(arena);
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
