class Tetris {
  constructor(element) {
    this.images = [];

    let blockTypes = 8;
    for (let i = 0; i < blockTypes; i += 1) {
      console.log("ADD IMG", i);
      let newImage = new Image(2, 2);
      newImage.src = "/static/graphics/" + i + ".svg";
      this.images.push(newImage);
    }

    this.element = element;
    this.canvas = element.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.context.scale(20, 20);

    this.arena = new Arena(12, 20);
    this.player = new TetrisPlayer(this);

    this.colors = [
      null,
      "black", //"#FF0D72", // BTC
      "silver", //"#0DC2FF", // ETH
      "white", // "#0DFF72", // LTC
      "red", // "#F538FF", // TRX
      "#FF8E0D", // USDT
      "#FFE138", // VTC
      "#3877FF" // XMR
    ];

    // 0 - xrp
    // 1 - btc
    // 2 - eth
    // 3 - ltc
    // 4 - trx
    // 5 - usdt
    // 6 - vtc
    // 7 - xmr

    let lastTime = 0;
    const update = (time = 0) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      this.player.update(deltaTime);

      this.draw();
      requestAnimationFrame(update);
    };

    update();
    this.updateScore(0);
  }

  draw() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
    this.drawMatrix(this.player.matrix, this.player.pos);
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = this.colors[value];
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
          // console.log("VALUE", value);
          this.drawImage(value, { x: x + offset.x, y: y + offset.y });
        }
      });
    });
  }

  drawImage(currency, pos) {
    // console.log("Render Currency", currency);
    // console.log("IMAGE AT", this.images[currency]);
    this.context.drawImage(this.images[currency], pos.x, pos.y, 1, 1);
    // switch (currency) {
    //   case 1:
    //     this.context.drawImage(this.images[currency], pos.x, pos.y, 1, 1);
    //     return;
    //   case 2:
    //     this.context.drawImage(this.images[currency], pos.x, pos.y, 1, 1);
    //     return;
    //   case "ltc":
    //     this.context.drawImage(this.images[currency], pos.x, pos.y, 1, 1);
    //     return;
    //   case "trx":
    //     this.context.drawImage(this.images[currency], pos.x, pos.y, 1, 1);
    //     return;
    //   case "usdt":
    //     this.context.drawImage(this.images[0], pos.x, pos.y, 1, 1);
    //     return;
    //   case "vtc":
    //     this.context.drawImage(this.images[0], pos.x, pos.y, 1, 1);
    //     return;
    //   case "xrp":
    //     this.context.drawImage(this.images[0], pos.x, pos.y, 1, 1);
    //     return;
    //   case "xmr":
    //     return;
    //   default:
    //     this.context.fillStyle = this.colors[0];
    //     this.context.fillRect(pos.x, pos.y, 1, 1);
    // }
  }

  updateScore(score) {
    this.element.querySelector(".score").innerText = score;
  }
}
