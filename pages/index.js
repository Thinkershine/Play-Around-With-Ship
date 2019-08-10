import React, { useReducer, useEffect } from "react";

const spaceshipReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_LEFT":
      return { ...state, leftPosition: action.payload.leftPosition };
    case "MOVE_UP":
      return { ...state, topPosition: action.payload.topPosition };
    case "MOVE_RIGHT":
      return { ...state, leftPosition: action.payload.leftPosition };
    case "MOVE_DOWN":
      return { ...state, topPosition: action.payload.topPosition };
    default:
      return new Error();
  }
};

const Index = () => {
  const spaceshipConfig = { speed: 10 };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  const handleKeyPress = event => {
    switch (event.keyCode) {
      case 37:
        dispatchSpaceship({
          type: "MOVE_LEFT",
          payload: {
            leftPosition: spaceshipPosition.leftPosition - spaceshipConfig.speed
          }
        });
        break;
      case 38:
        dispatchSpaceship({
          type: "MOVE_UP",
          payload: {
            topPosition: spaceshipPosition.topPosition - spaceshipConfig.speed
          }
        });

        break;
      case 39:
        dispatchSpaceship({
          type: "MOVE_RIGHT",
          payload: {
            leftPosition: spaceshipPosition.leftPosition + spaceshipConfig.speed
          }
        });

        break;
      case 40:
        dispatchSpaceship({
          type: "MOVE_DOWN",
          payload: {
            topPosition: spaceshipPosition.topPosition + spaceshipConfig.speed
          }
        });

        break;
      default:
        console.log("Other Key", event.key);
        break;
    }
  };

  const spaceshipStyle = {
    width: 10,
    height: 20,
    left: 100,
    right: 100,
    top: 50,
    backgroundColor: "purple",
    position: "relative"
  };

  const [spaceshipPosition, dispatchSpaceship] = useReducer(spaceshipReducer, {
    leftPosition: 10,
    topPosition: 100
  });

  return (
    <div>
      <h1>Here it goes</h1>
      {console.log("SPACESHPIT STYLE", spaceshipPosition)}
      <div id="spaceship" style={spaceshipStyle} />
      <div
        id="spaceship2"
        style={{
          width: 20,
          height: 20,
          backgroundColor: "red",
          left: spaceshipPosition.leftPosition,
          top: spaceshipPosition.topPosition,
          position: "absolute"
        }}
      />
    </div>
  );
};

export default Index;
