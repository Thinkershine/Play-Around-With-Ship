import React, { useReducer, useEffect } from "react";
import Tetris from "./tetris";

const spaceshipReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_LEFT":
      return {
        ...state,
        leftPosition: action.payload.leftPosition,
        direction: action.payload.direction
      };
    case "MOVE_UP":
      return {
        ...state,
        topPosition: action.payload.topPosition,
        direction: action.payload.direction
      };
    case "MOVE_RIGHT":
      return {
        ...state,
        leftPosition: action.payload.leftPosition,
        direction: action.payload.direction
      };
    case "MOVE_DOWN":
      return {
        ...state,
        topPosition: action.payload.topPosition,
        direction: action.payload.direction
      };
    case "STOP":
      console.log("STOP");
      return { ...state, direction: action.payload.direction };
    default:
      return new Error();
  }
};

const Index = () => {
  const spaceshipConfig = { speed: 1 };

  const [spaceshipPosition, dispatchSpaceship] = useReducer(spaceshipReducer, {
    leftPosition: 10,
    topPosition: 100,
    direction: "none"
  });

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress);
  //   return () => document.removeEventListener("keydown", handleKeyPress);
  // });

  // useEffect(() => {
  //   const flyShipTimer = setInterval(flyShip, 25);
  //   return () => clearInterval(flyShipTimer);
  // });

  const flyShip = () => {
    console.log("FLY Direction: ", spaceshipPosition.direction);
    switch (spaceshipPosition.direction) {
      case "LEFT":
        dispatchSpaceship({
          type: "MOVE_LEFT",
          payload: {
            leftPosition:
              spaceshipPosition.leftPosition - spaceshipConfig.speed,
            direction: "LEFT"
          }
        });
        break;
      case "TOP":
        dispatchSpaceship({
          type: "MOVE_UP",
          payload: {
            topPosition: spaceshipPosition.topPosition - spaceshipConfig.speed,
            direction: "TOP"
          }
        });
        break;
      case "RIGHT":
        dispatchSpaceship({
          type: "MOVE_RIGHT",
          payload: {
            leftPosition:
              spaceshipPosition.leftPosition + spaceshipConfig.speed,
            direction: "RIGHT"
          }
        });
        break;
      case "DOWN":
        dispatchSpaceship({
          type: "MOVE_DOWN",
          payload: {
            topPosition: spaceshipPosition.topPosition + spaceshipConfig.speed,
            direction: "DOWN"
          }
        });
        break;
      case "NONE":
        break;
      default:
        return new Error();
    }
  };

  const handleKeyPress = event => {
    switch (event.keyCode) {
      case 37:
        dispatchSpaceship({
          type: "MOVE_LEFT",
          payload: {
            leftPosition:
              spaceshipPosition.leftPosition - spaceshipConfig.speed,
            direction: "LEFT"
          }
        });
        break;
      case 38:
        dispatchSpaceship({
          type: "MOVE_UP",
          payload: {
            topPosition: spaceshipPosition.topPosition - spaceshipConfig.speed,
            direction: "TOP"
          }
        });

        break;
      case 39:
        dispatchSpaceship({
          type: "MOVE_RIGHT",
          payload: {
            leftPosition:
              spaceshipPosition.leftPosition + spaceshipConfig.speed,
            direction: "RIGHT"
          }
        });

        break;
      case 40:
        dispatchSpaceship({
          type: "MOVE_DOWN",
          payload: {
            topPosition: spaceshipPosition.topPosition + spaceshipConfig.speed,
            direction: "DOWN"
          }
        });

        break;

      case 32:
        dispatchSpaceship({
          type: "STOP",
          payload: {
            direction: "NONE"
          }
        });
      default:
        console.log("Other Key", event.key, "Key Code", event.keyCode);
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
      <hr style={{ margin: 50 }} />
      <Tetris />
    </div>
  );
};

export default Index;
