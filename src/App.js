import {useEffect, useState} from "react" 
import createBoard from "./components/createBoard";
import checkForColumnOfFour from "./components/checkForColumnOfFour";
import checkForColumnOfThree from "./components/checkForColumnOfThree";
import checkForRowOfFour from "./components/checkForRowOfFour";
import checkForRowOfThree from "./components/checkForRowOfThree";

const  App = () => {
  
  const width = 8 ;

  const [currentColorArrangement , setCurrentColorArrangement] = useState([])

  useEffect (() => {
    createBoard(width, setCurrentColorArrangement)
  },[])

  useEffect (() => {
    const timer = setInterval(() => {
      checkForColumnOfFour(width,currentColorArrangement)
      checkForRowOfFour(width, currentColorArrangement)
      checkForColumnOfThree(width, currentColorArrangement)
      checkForRowOfThree(width, currentColorArrangement)
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100);
    return () => clearInterval (timer) 
  },[currentColorArrangement])

  
  return <div className="app">
    <div className="game">
    {currentColorArrangement.map((candyColor,index) => (
        <img 
        key ={index} 
        style ={{backgroundColor : candyColor}}
        alt ={candyColor}
        />

        ))}
    </div>
     
  </div>;
}

export default App;
