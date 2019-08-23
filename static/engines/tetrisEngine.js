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

function updateScore() {
  document.getElementById("score").innerText = tetris.player.score;
}

const canvas = document.getElementById("tetris");
const tetris = new Tetris(canvas);

const handleKeyPress = event => {
  const player = tetris.player;
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

updateScore();
