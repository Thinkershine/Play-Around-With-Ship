import React, { useRef, useEffect } from "react";

const TetrisAnother = () => {
  const board = useRef(null);

  useEffect(() => {
    const canvas = board.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
  });

  return (
    <div>
      <h1>Tetris Another Way</h1>
      <canvas width="240" height="400" ref={board} />
    </div>
  );
};

export default TetrisAnother;
