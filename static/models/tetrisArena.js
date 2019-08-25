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

  sweep(cryptoScore) {
    let rowCount = 1;

    let previousBlock = "";
    let currentBlock = "";
    let wholeLineCounter = 0;

    outer: for (let y = this.matrix.length - 1; y > 0; y -= 1) {
      previousBlock = "";
      wholeLineCounter = 0;
      for (let x = 0; x < this.matrix[y].length; x += 1) {
        switch (this.matrix[y][x]) {
          case 0:
            continue outer;
          case 1:
            cryptoScore.btc += 1 * rowCount;
            currentBlock = "btc";
            break;
          case 2:
            cryptoScore.eth += 1 * rowCount;
            currentBlock = "eth";
            break;
          case 3:
            cryptoScore.ltc += 1 * rowCount;
            currentBlock = "ltc";
            break;
          case 4:
            cryptoScore.trx += 1 * rowCount;
            currentBlock = "trx";
            break;
          case 5:
            cryptoScore.usdt += 1 * rowCount;
            currentBlock = "usdt";
            break;
          case 6:
            cryptoScore.vtc += 1 * rowCount;
            currentBlock = "vtc";
            break;
          case 7:
            cryptoScore.xmr += 1 * rowCount;
            currentBlock = "xmr";
            break;
        }

        if (previousBlock === "") {
          previousBlock = currentBlock;
          wholeLineCounter += 1;
        } else {
          if (currentBlock === previousBlock) {
            wholeLineCounter += 1;
          }
        }

        const wholeLine = 12;
        if (wholeLineCounter == wholeLine) {
          // ADD BONUS To Block Reward
          switch (previousBlock) {
            case "btc":
              cryptoScore.btc += wholeLine * rowCount;
              break;
            case "eth":
              cryptoScore.eth += wholeLine * rowCount;
              break;
            case "ltc":
              cryptoScore.ltc += wholeLine * rowCount;
              break;
            case "trx":
              cryptoScore.trx += wholeLine * rowCount;
              break;
            case "usdt":
              cryptoScore.usdt += wholeLine * rowCount;
              break;
            case "vtc":
              cryptoScore.vtc += wholeLine * rowCount;
              break;
            case "xmr":
              cryptoScore.xmr += wholeLine * rowCount;
              break;
          }
        }
      }

      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      y += 1;

      cryptoScore.score += rowCount * 10;
      cryptoScore.btc += rowCount * 1; // Only If BTC Was There ... ??
      // hmmm ?? HOW ?? // HOW TO ADD ONLY COINS THAT WERE DISCOVERED INSIDE A BLOCK ?/

      rowCount *= 2;
    }

    return cryptoScore;
  }
}
