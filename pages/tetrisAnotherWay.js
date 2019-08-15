import React, { useRef, useEffect } from "react";

const TetrisAnother = () => {
  const board = useRef(null);

  const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

  useEffect(() => {
    const canvas = board.current;
    const context = canvas.getContext("2d");
    context.scale(20, 20);
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(matrix, { x: 5, y: 5 }, context);
  });

  const drawMatrix = (matrix, offset, context) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = "red";
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  };

  return (
    <div>
      <h1>Tetris Another Way</h1>
      <canvas width="240" height="400" ref={board} />
    </div>
  );
};

export default TetrisAnother;
