import React, { useState } from "react";
import axios from "axios";

const url = `http://localhost:9000/api/result`;

export default function AppFunctional(props) {
  const [state, setState] = useState({
    x: 2,
    y: 2,
    numberOfSteps: 0,
    email: "",
    currentIndex: 4,
    resultsMessage: "",
    stepsMessage: 'You moved 0 times',
  });
  const handleInput = (e) => {
    e.preventDefault();
    setState({ ...state, email: [e.target.value] });
  };
  const handleDirectionalInput = async (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "up":
        if (state.y > 1) {
          document.getElementById("grid").children[
            state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            state.currentIndex - 3
          ].classList += " active";
          document.getElementById("grid").children[
            state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            state.currentIndex - 3
          ].textContent = "B";
          await setState({
            ...state,
            y: state.y - 1,
            numberOfSteps: state.numberOfSteps + 1,
            currentIndex: state.currentIndex - 3,
          });
        }else {
          setState({...state, resultsMessage:"You can't go up"})
        }
        break;
      case "down":
        if (state.y < 3) {
          document.getElementById("grid").children[
            state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            state.currentIndex + 3
          ].classList += " active";
          document.getElementById("grid").children[
            state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            state.currentIndex + 3
          ].textContent = "B";
          await setState({
            ...state,
            y: state.y + 1,
            numberOfSteps: state.numberOfSteps + 1,
            currentIndex: state.currentIndex + 3,
          });
        }else {
          setState({...state, resultsMessage:"You can't go down"})
        }
        break;
      case "left":
        if (state.x > 1) {
          document.getElementById("grid").children[
            state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            state.currentIndex - 1
          ].classList += " active";
          document.getElementById("grid").children[
            state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            state.currentIndex - 1
          ].textContent = "B";
          await setState({
            ...state,
            x: state.x - 1,
            numberOfSteps: state.numberOfSteps + 1,
            currentIndex: state.currentIndex - 1,
          });
        }else {
          setState({...state, resultsMessage:"You can't go left"})
        }
        break;
      case "right":
        if (state.x < 3) {
          document.getElementById("grid").children[
            state.currentIndex
          ].classList = "square";
          document.getElementById("grid").children[
            state.currentIndex + 1
          ].classList += " active";
          document.getElementById("grid").children[
            state.currentIndex
          ].textContent = "";
          document.getElementById("grid").children[
            state.currentIndex + 1
          ].textContent = "B";
          await setState({
            ...state,
            x: state.x + 1,
            numberOfSteps: state.numberOfSteps + 1,
            currentIndex: state.currentIndex + 1,
          });
        }else {
          setState({...state, resultsMessage:"You can't go right"})
        }
        break;
      default:
        break;
    }
// ```    // let resMessage = `You moved ${state.numberOfSteps} time`
//     // // if(state.numberOfSteps !== 1) {
//     // //   resMessage += 's'
//     // // }
//     // // console.log("### ResMessage", resMessage)
//     // setState({...state, stepsMessage: resMessage})```
//   
  };
  const handleReset = (e) => {
    document.getElementById("grid").children[state.currentIndex].classList =
      "square";
    document.getElementById("grid").children[4].classList = "square active";
    document.getElementById("grid").children[state.currentIndex].textContent =
      "";
    document.getElementById("grid").children[4].textContent = "B";
    setState({
      ...state,
      x: 2,
      y: 2,
      numberOfSteps: 0,
      email: "",
      currentIndex: 4,
      resultsMessage: ""
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if(state.email === '') {
      setState({...state, resultsMessage: 'Ouch: email is required'})
    }
    const payload = {
      email: state.email.toString(),
      steps: state.numberOfSteps,
      x: state.x,
      y: state.y,
    };
    await axios.post(url, payload).then((res) => {
      setState({ ...state, email: "", resultsMessage: res.data.message });
    });
  };
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({state.x}, {state.y})</h3>
        <h3 id="steps">{state.stepsMessage}</h3>
      </div>
      {/* ////sssssss */}
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
        <h3 id="message">{state.resultsMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={handleDirectionalInput}>
          LEFT
        </button>
        <button id="up" onClick={handleDirectionalInput}>
          UP
        </button>
        <button id="right" onClick={handleDirectionalInput}>
          RIGHT
        </button>
        <button id="down" onClick={handleDirectionalInput}>
          DOWN
        </button>
        <button id="reset" onClick={handleReset}>
          reset
        </button>
      </div>
      <form>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={state.email}
          onChange={handleInput}
        ></input>
        <input id="submit" type="submit" onClick={handlesubmit}></input>
      </form>
    </div>
  );
}
