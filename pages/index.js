import React from "react";

export default function Index() {
  const handleKeyPress = event => {
    console.log("EVENT", event.keyCode);
    if (event.keyCode === 200) {
      console.log("UP");
    }
    switch (event.keyCode) {
      case 37:
        console.log("LEFT");
        break;
      case 38:
        console.log("UP");
        break;
      case 39:
        console.log("RIGHT");
        break;
      case 40:
        console.log("DOWN");
        break;
      default:
        console.log("Other Key", event.key);
        break;
    }
  };

  return (
    <div>
      <h1>Here it goes</h1>
      <input type="text" id="one" onKeyDown={handleKeyPress} />
    </div>
  );
}
