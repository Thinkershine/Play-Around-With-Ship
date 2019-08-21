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

function playerDrop() {
  player.pos.y += 1;
  if (collide(arena, player)) {
    player.pos.y -= 1;
    merge(arena, player);
    playerReset();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function playerReset() {
  const pieces = "ILJOTSZ";
  player.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
  player.pos.y = 0;
  player.pos.x =
    ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);

  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function rotate(matrix, dir) {
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

const player = {
  pos: { x: 5, y: 5 },
  matrix: createPiece("I")
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
    case 81:
      playerRotate(-1);
      break;
    case 87:
      playerRotate(1);
      break;
    default:
      console.log("Other Key", event.key, "Key Code", event.keyCode);
      break;
  }
};

document.addEventListener("keydown", handleKeyPress);
