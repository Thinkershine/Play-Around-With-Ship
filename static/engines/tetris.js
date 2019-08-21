const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

const matrix = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

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

drawMatrix(matrix, { x: 5, y: 5 });

const handleKeyPress = event => {
  switch (event.keyCode) {
    case 37:
      break;
    case 38:
      break;
    case 39:
      break;
    case 40:
      break;
    case 68:
      break;
    default:
      console.log("Other Key", event.key, "Key Code", event.keyCode);
      break;
  }
};

document.addEventListener("keydown", handleKeyPress);
