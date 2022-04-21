import React from "react";
import axios from "axios";

const url = `http://localhost:9000/api/result`;

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 2,
      y: 2,
      numberOfSteps: 0,
      email: "",
      currentIndex: 4,
      resultsMessage: "",
      stepMessge: 'You moved 0 times',
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, email: [e.target.value] });
  };

  getStepsMessage() {
    let newStepMessage = `You moved ${this.state.numberOfSteps + 1} time`
    if (this.state.numberOfSteps + 1 !== 1) {
      newStepMessage = newStepMessage + 's'
    }
    return newStepMessage
  }

  handleDirectionalInput = async (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "up":
        if (this.state.y > 1) {
          document.getElementById("grid").children[
            this.state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            this.state.currentIndex - 3
          ].classList += " active";
          document.getElementById("grid").children[
            this.state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            this.state.currentIndex - 3
          ].textContent = "B";
          this.setState({
            ...this.state,
            y: this.state.y - 1,
            numberOfSteps: this.state.numberOfSteps + 1,
            currentIndex: this.state.currentIndex - 3,
            stepMessge:  this.getStepsMessage()
          });
        } else {
          this.setState({ ...this.state, resultsMessage: "You can't go up" });
        }
        break;
      case "down":
        if (this.state.y < 3) {
          document.getElementById("grid").children[
            this.state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            this.state.currentIndex + 3
          ].classList += " active";
          document.getElementById("grid").children[
            this.state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            this.state.currentIndex + 3
          ].textContent = "B";
          this.setState({
            ...this.state,
            y: this.state.y + 1,
            numberOfSteps: this.state.numberOfSteps + 1,
            currentIndex: this.state.currentIndex + 3,
            stepMessge:  this.getStepsMessage()
          });
        } else {
          this.setState({ ...this.state, resultsMessage: "You can't go down" });
        }
        break;
      case "left":
        if (this.state.x > 1) {
          document.getElementById("grid").children[
            this.state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            this.state.currentIndex - 1
          ].classList += " active";
          document.getElementById("grid").children[
            this.state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            this.state.currentIndex - 1
          ].textContent = "B";

          this.setState({
            ...this.state,
            x: this.state.x - 1,
            numberOfSteps: this.state.numberOfSteps + 1,
            currentIndex: this.state.currentIndex - 1,
            stepMessge:  this.getStepsMessage()
          });
        } else {
          this.setState({ ...this.state, resultsMessage: "You can't go left" });
        }
        break;
      case "right":
        if (this.state.x < 3) {
          document.getElementById("grid").children[
            this.state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            this.state.currentIndex + 1
          ].classList += " active";
          document.getElementById("grid").children[
            this.state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            this.state.currentIndex + 1
          ].textContent = "B";

          this.setState({
            ...this.state,
            x: this.state.x + 1,
            numberOfSteps: this.state.numberOfSteps + 1,
            currentIndex: this.state.currentIndex + 1,
            stepMessge:  this.getStepsMessage()
          });
        } else {
          this.setState({
            ...this.state,
            resultsMessage: "You can't go right",
          });
        }
        break;
      default:
        break;
    }
  };

  handleReset = (e) => {
    document.getElementById("grid").children[
      this.state.currentIndex
    ].classList = "square";
    document.getElementById("grid").children[4].classList = "square active";
    document.getElementById("grid").children[
      this.state.currentIndex
    ].textContent = "";
    document.getElementById("grid").children[4].textContent = "B";
    this.setState({
      ...this.state,
      x: 2,
      y: 2,
      numberOfSteps: 0,
      email: "",
      currentIndex: 4,
      resultsMessage: "",
      stepMessge: 'You moved 0 times'
    });
  };

  handlesubmit = (e) => {
    e.preventDefault();
    if (this.state.email === "") {
      this.setState({
        ...this.state,
        resultsMessage: 'Ouch: email is required',
      });
      return;
    }

    axios
      .post(url, {
        email: this.state.email.toString(),
        steps: this.state.numberOfSteps,
        x: this.state.x,
        y: this.state.y,
      })
      .then((res) => {

        this.setState({
          ...this.state,
          email: "",
          resultsMessage: res.data.message,
        });
      })
      .catch((error) => {
        if (error.message === 'Request failed with status code 403') {
          this.setState({
            ...this.state,
            email: "",
            resultsMessage: 'foo@bar.baz failure #71',
          });
        } else {
          this.setState({
            ...this.state,
            email: "",
            resultsMessage: 'Ouch: email must be a valid email',
          });
        }
      });
  };
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
          <h3 id="steps">{this.state.stepMessge}</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message">{[this.state.resultsMessage]}</h3>
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
          <input id="submit" type="submit" onClick={this.handlesubmit}></input>
        </form>
      </div>
    );
  }
}
