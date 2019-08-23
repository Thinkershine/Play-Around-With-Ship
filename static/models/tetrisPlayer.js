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

  reset() {
    const pieces = "ILJOTSZ";
    this.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
    this.pos.y = 0;
    this.pos.x =
      ((arena[0].length / 2) | 0) - ((this.matrix[0].length / 2) | 0);

    if (collide(arena, this)) {
      arena.forEach(row => row.fill(0));
      this.score = 0;
      updateScore();
    }
  }

  rotate(dir) {
    const pos = this.pos.x;
    let offset = 1;
    this._rotateMatrix(this.matrix, dir);
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

  _rotateMatrix(matrix, dir) {
    for (let y = 0; y < matrix.length; y += 1) {
      for (let x = 0; x < y; x += 1) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }
    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  drop() {
    this.pos.y += 1;
    if (collide(arena, this)) {
      this.pos.y -= 1;
      merge(arena, this);
      this.reset();
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
