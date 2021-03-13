import { Scores } from './Scores';
import { Inputs } from './Inputs';

export const Frames = ({inputlist, scorelist, current}) => {

    return (
      <div className = "container"> 
        <div className="frames"> Frame 
          {[...Array(10).keys()].map((num, index) => {
              return(
                  <div key={index} className={current===num+1 ? "red" : "frame"}>{num+1}</div>
              );
            })
          }      
        </div>
        <Inputs inputs={inputlist}></Inputs>
        <Scores scores={scorelist}></Scores>
      </div>

    );
  }
  
