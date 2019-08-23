class Tetris {
  constructor() {}

  draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.drawMatrix(arena.matrix, { x: 0, y: 0 });
    this.drawMatrix(player.matrix, player.pos);
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value];
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }
}
