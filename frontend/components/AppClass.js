import React from "react";

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 2,
      y: 2,
      numberOfSteps: 0,
      email: "",
      currentIndex: 4,
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, email: [e.target.value] });
  };

  handleDirectionalInput = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "up":
        if (this.state.y > 1) {
          this.setState({ ...this.state, y: this.state.y - 1, numberOfSteps: this.state.numberOfSteps+1 });
          document.getElementById("grid").children[this.state.currentIndex].classList = 'square'
          document.getElementById("grid").children[this.state.currentIndex -3].classList = 'square active'
        }
        break;
      case "down":
        if (this.state.y < 3) {
          this.setState({ ...this.state, y: this.state.y + 1, numberOfSteps: this.state.numberOfSteps+1});
        }
        break;
      case "left":
        if (this.state.x > 1) {
          this.setState({ ...this.state, x: this.state.x - 1, numberOfSteps: this.state.numberOfSteps+1 });
        }
        break;
      case "right":
        if (this.state.x < 3) {
          this.setState({ ...this.state, x: this.state.x + 1, numberOfSteps: this.state.numberOfSteps+1 });
        }
        break;
      default:
        break;
    }
    console.log("##########", this.state.x, this.state.y);
  };
  
  handleReset = (e)=>{
    this.setState({
      x: 2,
      y: 2,
      numberOfSteps: 0,
      email: "",
    })
  }
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
          <h3 id="steps">{`You moved ${this.state.numberOfSteps} times`}</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleDirectionalInput} id="left">
            LEFT
          </button>
          <button onClick={this.handleDirectionalInput} id="up">
            UP
          </button>
          <button onClick={this.handleDirectionalInput} id="right">
            RIGHT
          </button>
          <button onClick={this.handleDirectionalInput} id="down">
            DOWN
          </button>
          <button onClick={this.handleReset} id="reset">
            reset
          </button>
        </div>
        <form>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={this.state.email}
            onChange={this.handleInput}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
