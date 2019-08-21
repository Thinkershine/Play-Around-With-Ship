const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

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
