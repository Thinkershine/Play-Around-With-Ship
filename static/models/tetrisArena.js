class Arena {
  constructor(width, height) {
    const matrix = [];
    while (height !== 0) {
      matrix.push(new Array(width).fill(0));
      height -= 1;
    }
    this.matrix = matrix;
  }

  clear() {
    this.matrix.forEach(row => row.fill(0));
  }

  collide(player) {
    const [matrix, offset] = [player.matrix, player.pos];
    for (let y = 0; y < matrix.length; y += 1) {
      for (let x = 0; x < matrix[y].length; x += 1) {
        if (
          matrix[y][x] !== 0 &&
          (this.matrix[y + offset.y] &&
            this.matrix[y + offset.y][x + offset.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  merge(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  sweep() {
    let rowCount = 1;

    let cryptoScore = {
      score: 0,
      btc: 0,
      eth: 0,
      ltc: 0,
      trx: 0,
      usdt: 0,
      vtc: 0,
      xmr: 0
    };
    outer: for (let y = this.matrix.length - 1; y > 0; y -= 1) {
      for (let x = 0; x < this.matrix[y].length; x += 1) {
        switch (this.matrix[y][x]) {
          case 0:
            continue outer;
          case 1:
            cryptoScore.btc += 1;
            break;
          case 2:
            cryptoScore.eth += 1;
            break;
          case 3:
            cryptoScore.ltc += 1;
            break;
          case 4:
            cryptoScore.trx += 1;
            break;
          case 5:
            cryptoScore.usdt += 1;
            break;
          case 6:
            cryptoScore.vtc += 1;
            break;
          case 7:
            cryptoScore.xmr += 1;
            break;
        }
      }

      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      y += 1;

      cryptoScore.score += rowCount * 10;
      rowCount *= 2;
    }

    console.log("CRYPTO SCORE", cryptoScore);
    return cryptoScore.score;
  }
}
