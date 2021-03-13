export const Scores = ({scores}) => {
    return (
      <div>
        <div className="scores"> Score:
          {scores.slice(1,11).map((score, index) => {
              return (
                  <div key={index} className="score">{score}</div>
              )})
            }      
        </div>   
    </div>
    );
  }