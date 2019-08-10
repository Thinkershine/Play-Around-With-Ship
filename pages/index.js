import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundCanvas: this.refs.canvas,
      handleKeyPress: this.handleKeyPress.bind(this),
      spaceshipStyle: {
        width: 10,
        height: 20,
        left: 100,
        right: 100,
        top: 50,
        backgroundColor: "purple",
        position: "relative"
      }
    };
  }

  componentDidMount() {
    this.setState({ backgroundCanvas: this.refs.canvas }, () =>
      this.setState({ context: this.state.backgroundCanvas.getContext("2d") })
    );

    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = event => {
    console.log("EVENT", event.keyCode);
    const spaceship = document.getElementById("spaceship");
    if (event.keyCode === 200) {
      console.log("UP");
    }
    switch (event.keyCode) {
      case 37:
        console.log("LEFT");
        // spaceship.getBoundingClientRect().left += 10;
        console.log(spaceship.offsetLeft);
        // spaceship.style.left = spaceship.style.left + 5 + "px";
        spaceship.style.left -= 1 + "px";
        console.log("SPACESHIP", spaceship.style.left);
        break;
      case 38:
        console.log("UP");
        spaceship.style.top = spaceship.style.top + 5 + "px";

        break;
      case 39:
        console.log("RIGHT");
        spaceship.style.top = spaceship.style.right + 5 + "px";

        break;
      case 40:
        console.log("DOWN");
        spaceship.style.top = spaceship.style.botton + 5 + "px";

        break;
      default:
        console.log("Other Key", event.key);
        break;
    }
  };

  render() {
    return (
      <div>
        <h1>Here it goes</h1>
        {console.log("SPACESHPIT STYLE", this.state.spaceshipStyle)}
        <div id="spaceship" style={this.state.spaceshpiStyle} />
        <canvas
          ref="canvas"
          width={450}
          height={450}
          id="UniverseBackground"
          onKeyDown={() => this.state.handleKeyPress()}
        />
      </div>
    );
  }
}

export default Index;
