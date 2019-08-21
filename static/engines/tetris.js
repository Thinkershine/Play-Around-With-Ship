const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);

const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

function createArena(width, height) {
  const matrix = [];
  while (height !== 0) {
    matrix.push(new Array(width).fill(0));
    height -= 1;
  }
  return matrix;
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = "red";
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function playerDrop() {
  player.pos.y += 1;
  dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

const arena = createArena(12, 20);

const player = {
  pos: { x: 5, y: 5 },
  matrix: matrix
};

update();

const handleKeyPress = event => {
  switch (event.keyCode) {
    case 37:
      player.pos.x -= 1;
      break;
    case 38:
      break;
    case 39:
      player.pos.x += 1;
      break;
    case 40:
      playerDrop();
      break;
    case 68:
      break;
    default:
      console.log("Other Key", event.key, "Key Code", event.keyCode);
      break;
  }
};

document.addEventListener("keydown", handleKeyPress);
