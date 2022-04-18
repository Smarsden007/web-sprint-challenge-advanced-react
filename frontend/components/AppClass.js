import React from "react";
import axios from "axios";


const url = `http://localhost:9000/api/result`

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
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, email: [e.target.value] });
  };

  handleDirectionalInput = async (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "up":
        if (this.state.y > 1) {
          document.getElementById("grid").children[this.state.currentIndex].classList = 'square'
          document.getElementById("grid").children[this.state.currentIndex - 3].classList += ' active'
          document.getElementById("grid").children[this.state.currentIndex].textContent = ''
          document.getElementById("grid").children[this.state.currentIndex - 3].textContent = 'B'
          await this.setState({ ...this.state, y: this.state.y - 1, numberOfSteps: this.state.numberOfSteps+1, currentIndex: this.state.currentIndex - 3});
        }
        break;
      case "down":
        if (this.state.y < 3) {
          document.getElementById("grid").children[this.state.currentIndex].classList = 'square'
          document.getElementById("grid").children[this.state.currentIndex + 3].classList += ' active'
          document.getElementById("grid").children[this.state.currentIndex].textContent = ''
          document.getElementById("grid").children[this.state.currentIndex + 3].textContent = 'B'
          await this.setState({ ...this.state, y: this.state.y + 1, numberOfSteps: this.state.numberOfSteps+1, currentIndex: this.state.currentIndex + 3});
        }
        break;
      case "left":
        if (this.state.x > 1) {
          document.getElementById("grid").children[this.state.currentIndex].classList = 'square'
          document.getElementById("grid").children[this.state.currentIndex - 1].classList += ' active'
          document.getElementById("grid").children[this.state.currentIndex].textContent = ''
          document.getElementById("grid").children[this.state.currentIndex - 1].textContent = 'B'
          await this.setState({ ...this.state, x: this.state.x - 1, numberOfSteps: this.state.numberOfSteps+1, currentIndex: this.state.currentIndex - 1 });
        }
        break;
      case "right":
        if (this.state.x < 3) {
          document.getElementById("grid").children[this.state.currentIndex].classList = 'square'
          document.getElementById("grid").children[this.state.currentIndex + 1].classList += ' active'
          document.getElementById("grid").children[this.state.currentIndex].textContent = ''
          document.getElementById("grid").children[this.state.currentIndex + 1].textContent = 'B'
          await this.setState({ ...this.state, x: this.state.x + 1, numberOfSteps: this.state.numberOfSteps+1, currentIndex: this.state.currentIndex + 1 });
        }
        break;
      default:
        break;
    }
    console.log("##########",this.state);
  };
  
  handleReset = (e)=>{
    document.getElementById("grid").children[this.state.currentIndex].classList = 'square'
    document.getElementById("grid").children[4].classList = 'square active'
    document.getElementById("grid").children[this.state.currentIndex].textContent = ''
    document.getElementById("grid").children[4].textContent = 'B'
    this.setState({
      ...this.state,
      x: 2,
      y: 2,
      numberOfSteps: 0,
      email: "",
      currentIndex: 4

    })
  }

  handlesubmit = (e) => {
    e.preventDefault()

    axios.post(url, {email: this.state.email.toString(), steps: this.state.numberOfSteps, x: this.state.x, y: this.state.y})
    .then((res) => {
      this.setState({ ...this.state, email:"", resultsMessage: res.data.message})
      console.log(res)
    })
    .catch((error)=>{
      console.log(error)
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
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.resultsMessage}</h3>
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
