const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);

const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

function collide(arena, player) {
  const matrix = player.matrix;
  const offset = player.pos;
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix[y].length; x += 1) {
      if (
        matrix[y][x] !== 0 &&
        (arena[y + offset.y] && arena[y + offset.y][x + offset.x]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}

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
  drawMatrix(arena, { x: 0, y: 0 });
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
  if (collide(arena, player)) {
    player.pos.y -= 1;
    merge(arena, player);
    player.pos.y = 0;
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
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
      playerMove(-1);
      break;
    case 38:
      break;
    case 39:
      playerMove(1);
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
