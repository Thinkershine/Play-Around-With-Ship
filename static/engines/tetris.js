const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);

function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; y -= 1) {
    for (let x = 0; x < arena[y].length; x += 1) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }

    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y += 1;

    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

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

function createPiece(type) {
  switch (type) {
    case "T":
      return [[0, 0, 0], [1, 1, 1], [0, 1, 0]];
    case "O":
      return [[2, 2], [2, 2]];
    case "L":
      return [[0, 3, 0], [0, 3, 0], [0, 3, 3]];
    case "J":
      return [[0, 4, 0], [0, 4, 0], [4, 4, 0]];
    case "I":
      return [[0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0]];
    case "S":
      return [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
    case "Z":
      return [[7, 7, 0], [0, 7, 7], [0, 0, 0]];
  }
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
        context.fillStyle = colors[value];
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

let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  player.update(deltaTime);

  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById("score").innerText = player.score;
}

const colors = [
  null,
  "#FF0D72",
  "#0DC2FF",
  "#0DFF72",
  "#F538FF",
  "#FF8E0D",
  "#FFE138",
  "#3877FF"
];

const arena = createArena(12, 20);

const player = new TetrisPlayer();

const handleKeyPress = event => {
  switch (event.keyCode) {
    case 37:
      player.move(-1);
      break;
    case 38:
      break;
    case 39:
      player.move(1);
      break;
    case 40:
      player.drop();
      break;
    case 81:
      player.rotate(-1);
      break;
    case 87:
      player.rotate(1);
      break;
    default:
      console.log("Other Key", event.key, "Key Code", event.keyCode);
      break;
  }
};

document.addEventListener("keydown", handleKeyPress);

player.reset();
updateScore();
update();
