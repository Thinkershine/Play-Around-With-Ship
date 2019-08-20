import React, { useState, useReducer, useRef, useEffect } from "react";

function createArena(width, height) {
  const matrix = [];
  while (height !== 0) {
    matrix.push(new Array(width).fill(0));
    height -= 1;
  }
  return matrix;
}

const collide = (arena, player) => {
  console.log("ARena @ Collide", arena);
  console.log("PLayer @ Collide", player);
  // Iterate over player
  const [m, position] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; y += 1) {
    for (let x = 0; x < m[y].length; x += 1) {
      if (
        m[y][x] !== 0 &&
        (arena[y + position.y] && arena[y + position.y][x + position.x]) !== 0
      ) {
        return true;
      }
    }
  }

  return false;
};

function merge(arena, player) {
  console.log("ARENA @ MERGE ", arena);
  console.log("PLAYER @ MERGE ", player);
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[player.pos.y][player.pos.x] = value;
      }
    });
  });
  return arena;
}

const gameReducer = (state, action) => {
  const player = state.player;
  const arena = state.arena;

  switch (action.type) {
    case "MOVE_LEFT":
      console.log("MOVE LEFT : STAT POS", player.pos);
      return {
        ...state,
        player: {
          pos: { x: action.payload.x, y: action.payload.y },
          matrix: player.matrix
        }
      };
    case "MOVE_RIGHT":
      console.log("MOVE RIGHT : STAT POS", player.pos);
      return {
        ...state,
        player: {
          pos: { x: action.payload.x, y: action.payload.y },
          matrix: player.matrix
        }
      };
    case "ROTATE":
      console.log("ROTATE");
      return;
    case "DROP":
      console.log("DROP : STAT POS", player.pos);
      return {
        ...state,
        player: {
          pos: { x: player.pos.x, y: player.pos.y + 1 },
          matrix: player.matrix
        }
      };
    case "GRAVITY":
      console.log("GRAVITY");
      console.log("PLAYER POS", player.pos);
      let bottomCollided = collide(arena, player);
      if (bottomCollided) {
        let newArena = merge(arena, player);
        return {
          arena: newArena,
          player: {
            pos: { x: action.payload.x, y: 0 },
            matrix: player.matrix
          }
        };
      } else {
        return {
          ...state,
          player: {
            pos: { x: action.payload.x, y: action.payload.y + 1 },
            matrix: player.matrix
          }
        };
      }
    default:
      return new Error();
  }
};

const TetrisAnother = () => {
  const board = useRef(null);
  const [canvas, setCanvas] = useState();
  const [drawingBoardContext, setDrawingBoardContext] = useState();

  const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

  const [game, dispatchPlayer] = useReducer(gameReducer, {
    player: {
      pos: { x: 1, y: 1 },
      matrix: matrix
    },
    arena: createArena(10, 18)
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
    drawMatrix(game.player.matrix, game.player.pos);
    drawArena(game.arena);
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

  const drawArena = arena => {
    arena.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          drawingBoardContext.fillStyle = "purple";
          drawingBoardContext.fillRect(x, y, 1, 1);
        }
      });
    });
  };

  let timeToDrop = false;
  const drop = () => {
    // dispatchPlayer({
    //   type: "GRAVITY",
    //   payload: {
    //     x: game.player.pos.x,
    //     y: game.player.pos.y
    //   }
    // });
    timeToDrop = true;
    handleKeyPress(new KeyboardEvent("keydown", { keyCode: 40 }));
  };

  const handleKeyPress = event => {
    console.log("EVENT", event);
    switch (event.keyCode) {
      case 37:
        dispatchPlayer({
          type: "MOVE_LEFT",
          payload: {
            x: game.player.pos.x - 1,
            y: timeToDrop ? game.player.pos.y + 1 : game.player.pos.y
          }
        });

        timeToDrop = false;
        draw();

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
            x: game.player.pos.x + 1,
            y: timeToDrop ? game.player.pos.y + 1 : game.player.pos.y
          }
        });

        timeToDrop = false;
        draw();

        break;
      case 40:
        dispatchPlayer({
          type: "DROP"
        });

        timeToDrop = false;
        draw();

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
