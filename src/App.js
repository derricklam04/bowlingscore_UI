import './App.scss';
import React, {useState} from 'react';
import { Frames } from './Components/Frames';
import { User } from './Components/User';

function App() {
  const [scores,setScores] = useState([0]);
  const [inputs,setInputs] = useState([]);
  const [inputsOnly,setInputsOnly] = useState([]);

  const [currentFrame, setCurrentFrame] = useState(1);
  const [lastCalculated, setLastCalculated] = useState(0);

  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  /**
   * Finding all scores up to the current frame that has sufficient data
   */
  const calculateScore = () => {
    let i = lastCalculated;
    while (i < inputsOnly.length){
      let sum = 0;

      if (inputsOnly[i] === "x"){  // 1- if frame is a strike 'x'
        sum += 10; 
        if (inputsOnly[i+1] === "x"){ // 2- if next is also strike
          sum += 10;  
          if (inputsOnly[i+2] === "x"){ // if 2nd next is also strike
            sum += 10;
          } else {
            let first = ((inputsOnly[i+2] === "-") ? 0 : inputsOnly[i+2])
            sum += first
          }
        } else if (inputsOnly[i+2] === "/"){ // 2- if next is spare 
          sum += 10;
        } else {  
          let first = ((inputsOnly[i+1] === "-") ? 0 : inputsOnly[i+1])
          let second = ((inputsOnly[i+2] === "-") ? 0 : inputsOnly[i+2])
          sum += first + second  
        }
      } else if (inputsOnly[i+1] === "/") { // 1- if frame is a spare 
        sum += 10;
        if (inputsOnly[i+2] === "x"){ // 2- if next is strike
          sum += 10;
        } else {
          let first = ((inputsOnly[i+2] === "-") ? 0 : inputsOnly[i+2])
          sum += first;
        }
        i += 1; // skip over 1 input
      } else {
        let first = ((inputsOnly[i] === "-") ? 0 : inputsOnly[i])
        let second = ((inputsOnly[i+1] === "-") ? 0 : inputsOnly[i+1])
        sum += first + second
        i += 1; // skip over 1 input
      }

      i += 1; // iterate to next input
      
      console.log(sum);
      scores.push(scores[scores.length-1] + sum);
      console.log(scores)
    }
    setLastCalculated(inputsOnly.length) 
  }



  const handleInput = (input) => {
      inputs.push(input);
      inputsOnly.push(input);
      if (input === "x" && currentFrame !== 10) inputs.push("");  // if input is a strike and not in last frame

      setInputs([...inputs]); // rerender
      console.log(inputs)

      if (inputs.length % 2 === 0){
        if (currentFrame < 10)  // increment currentFrame every 2 rolls 
          setCurrentFrame(currentFrame+1);
        if (inputs.length < 19 && (input === "-" || !isNaN(input))) // find scores if 2nd roll is either '-' or a num
          calculateScore();
      } else if (inputs.length === 21 ){ // if the 21th box is filled, game over
        gameOver();
      }
      
  }

  const gameOver = () => {
      calculateScore();
      setDisabled(true); // disable Enter button
      console.log(scores)

      setMessage("GAME OVER! Your score is " + scores[10])
  }

  const handleReset = () =>  {
    setScores([0]);
    setInputs([]);
    setInputsOnly([]);
    setCurrentFrame(1);
    setLastCalculated(0);
    setMessage("");
    setDisabled(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bowling Score</h1>
        <Frames inputlist={inputs} scorelist={scores} current={currentFrame}></Frames>
        <div className="gameover">{message}</div>
        <User enterInput={handleInput} isGameOver={gameOver}
          inputlist = {inputs} inputOnlyList = {inputsOnly} disable={disabled}>
        </User>
        <button className="reset" onClick={handleReset}>Reset Game</button>
      </header>
    </div>
  );
}

export default App;
