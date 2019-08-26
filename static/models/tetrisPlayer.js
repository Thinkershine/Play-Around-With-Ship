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
      this.setHighScore();
      this.cryptoScore.score = 0;
      this.tetris.updateScore(this.cryptoScore);
    }
  }

  setHighScore(){
    const maximumHighScores = 5;
    const currentHighScores = JSON.parse(localStorage.getItem("HIGHSCORES"));
    if (currentHighScores !== null){
      // check if is HighScore
      for (let i = 0; i < maximumHighScores; i += 1) {
        if (this.cryptoScore.score > currentHighScores[i])
        {
          console.log("CURRENT HIGHT", currentHighScores);
          
          // currentHighScores.unshift(this.cryptoScore.score);
          
          let temp = currentHighScores[i];
          currentHighScores[i] = this.cryptoScore;

          let slicedHighScores = currentHighScores.slice(i + 1, maximumHighScores - i);
          console.log("SCLIDED HIGHSCORES", slicedHighScores);

          let tempHighScores = currentHighScores.splice(0, maximumHighScores);
          console.log("CURRENT HIGHT SCORES AFTER UNSHIFT", currentHighScores);
          console.log("CURRENT TEMP SCORES ", tempHighScores);

          localStorage.setItem("HIGHSCORES", JSON.stringify(tempHighScores));
        }
      }
    } else {
      const topFive = new Array(maximumHighScores).fill(0);
      localStorage.setItem("HIGHSCORES", JSON.stringify(topFive));
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
