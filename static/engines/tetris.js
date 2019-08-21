const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

const yoMe = () => {
  alert("YO");
};

const handleKeyPress = event => {
  console.log("EVENT", event);
  switch (event.keyCode) {
    case 37:
      alert("YO 37");
      break;
    case 38:
      alert("YO 38");
      break;
    case 39:
      alert("YO 39");
      break;
    case 40:
      alert("YO 40");
      break;
    case 68:
      break;
    default:
      console.log("Other Key", event.key, "Key Code", event.keyCode);
      break;
  }
};

document.addEventListener("keydown", handleKeyPress);
