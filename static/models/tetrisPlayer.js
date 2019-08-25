class TetrisPlayer {
  constructor(tetris) {
    this.DROP_SLOW = 1000;
    this.DROP_FAST = 50;

    this.tetris = tetris;
    this.arena = tetris.arena;

    this.dropCounter = 0;
    this.dropInterval = this.DROP_SLOW;

    this.pos = { x: 5, y: 5 };
    this.matrix = null;
    this.cryptoScore = {
      score: 0,
      btc: 0,
      eth: 0,
      ltc: 0,
      trx: 0,
      usdt: 0,
      vtc: 0,
      xmr: 0
    };

    this.reset();
  }

  move(dir) {
    this.pos.x += dir;
    if (this.arena.collide(this)) {
      this.pos.x -= dir;
    }
  }

  reset() {
    const pieces = "ILJOTSZ";
    this.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
    this.pos.y = 0;
    this.pos.x =
      ((this.arena.matrix[0].length / 2) | 0) -
      ((this.matrix[0].length / 2) | 0);

    if (this.arena.collide(this)) {
      this.arena.clear();
      this.cryptoScore.score = 0;
      this.tetris.updateScore(this.cryptoScore);
    }
  }

  rotate(dir) {
    const pos = this.pos.x;
    let offset = 1;
    this._rotateMatrix(this.matrix, dir);
    while (this.arena.collide(this)) {
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
    if (this.arena.collide(this)) {
      this.pos.y -= 1;
      this.arena.merge(this);
      this.reset();
      this.cryptoScore = this.arena.sweep(this.cryptoScore);
      console.log("CRYPTO SCORE AT PLAYER", this.cryptoScore);
      this.tetris.updateScore(this.cryptoScore);
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
