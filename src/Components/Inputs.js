export const Inputs= ({inputs}) => {
    return (
      <div>
        <div className="inputs"> Input
          {inputs.map((input, index) => {
              return (
                  <div key={index} >
                    <div className="input">
                        {index % 2 === 0 && index < 18 && <div className="para">(</div>} 
                        {input}
                        {index % 2 === 1 && index < 18 && <div className="para">)</div>}
                    </div>
                  </div>
              )})
            }      
        </div>   
    </div>
    );
  }