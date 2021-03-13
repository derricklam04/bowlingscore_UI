import React, {useState} from 'react';

export const User = ({enterInput, isGameOver, inputlist, inputOnlyList, disable}) => {
    const [input,setInput] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) =>{
        setInput(event.target.value);
    }

   /**
    *  Determine if an input is a valid before passing it to be entered 
    */
    const isValid = (event) => {  
        event.preventDefault();
        setInput("");

        let symbols = new Set(["x","-","/"])
        if (!isNaN(input) && parseInt(input) < 10 && parseInt(input) > 0){  // if input is a number between 1 - 9
            enterInput(parseInt(input));
            setError("");

            // RULE - if 20th input is a number and the 19th isn't a strike --> gameover
            if (inputlist.length === 20 && inputOnlyList[inputOnlyList.length-2] !== 'x') isGameOver(); 

        } else if (symbols.has(input)){  // if input is a symbol in {x,-,/}

            if (inputlist.length === 19){ // RULE - on the 20th roll
                
                if (inputOnlyList[inputOnlyList.length-1] === 'x' && input === "/"){ // if the last roll was a strike and the input is spare / --> ERROR
                    setError("ERROR: A spare '/' cannot be entered for first roll");
                } else if (input === "-" && inputOnlyList[inputOnlyList.length-1] !== 'x'){ // if the 20th roll is a miss and the 19th isn't a strike --> gameover
                    enterInput(input);
                    setError("");
                    isGameOver();
                } else {
                    enterInput(input);
                    setError("");
                }
            }
            else if (inputlist.length === 20){ // RULE - on the 21st roll
                // if 21st roll is spare and the previous was not a miss and not a number --> ERROR
                if (input === "/" && (inputOnlyList[inputOnlyList.length-1] !== '-' && isNaN(inputOnlyList[inputOnlyList.length-1]))){
                    setError("ERROR: A spare '/' cannot be entered for first roll");
                // if 21st roll is strike and the previous was a miss or is a number --> ERROR
                } else if (input === "x" && (inputOnlyList[inputOnlyList.length-1] === '-' || !isNaN(inputOnlyList[inputOnlyList.length-1]))){
                    setError("ERROR: A strike 'x' cannot be entered for second roll");
                } else{
                    enterInput(input);
                    setError("");
                }
            } else if (input === "/" && inputlist.length%2 === 0 ) {  // GENERAL RULE - first roll can not be spare
                setError("ERROR: A spare '/' cannot be entered for first roll");
            } else if (input === "x" && inputlist.length%2 === 1) {  // GENERAL RULE - second roll can not be strike
                setError("ERROR: A strike 'x' cannot be entered for second roll");
            } else {
                enterInput(input);
                setError("");
            }
        } else {
            setError("ERROR: Please enter a number in range (1 - 9) or a symbol {x, -, /}");
        } 
    }
  
    return (
        <div className="User">
            <form onSubmit={isValid}>
                <input placeholder="Enter Number of Pins" type="text" id="roll" value={input} onChange={handleChange}/>
                <input type="submit" value="Enter"  disabled={disable}/>
            </form>
            <div className="error">{error}</div>
        </div>
    )
}