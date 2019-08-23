class TetrisPlayer {
  constructor() {
    this.dropCounter = 0;
    this.dropInterval = 1000;

    this.pos = { x: 5, y: 5 };
    this.matrix = null;
    this.score = 0;
  }

  move(dir) {
    this.pos.x += dir;
    if (collide(arena, this)) {
      this.pos.x -= dir;
    }
  }

  rotate(dir) {
    const pos = this.pos.x;
    let offset = 1;
    rotate(this.matrix, dir);
    while (collide(arena, this)) {
      this.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.matrix[0].length) {
        rotate(this.matrix, -dir);
        this.pos.x = pos;
        return;
      }
    }
  }

  drop() {
    this.pos.y += 1;
    if (collide(arena, this)) {
      this.pos.y -= 1;
      merge(arena, this);
      playerReset();
      arenaSweep();
      updateScore();
    }
    this.dropCounter = 0;
  }

  update(deltaTime) {
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }
  }
}
