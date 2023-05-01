import { useEffect, useState } from "react";
import createBoard from "./components/createBoard";
import checkForColumnOfFour from "./components/checkForColumnOfFour";
import checkForColumnOfThree from "./components/checkForColumnOfThree";
import checkForRowOfFour from "./components/checkForRowOfFour";
import checkForRowOfThree from "./components/checkForRowOfThree";
import moveIntoSquareBelow from "./components/moveIntoSquareBelow";
import ScoreBoards from "./components/ScoreBoards";

const App = () => {
  const width = 8;
  const candyColors = [
    "images/blue-candy.png",
    "images/green-candy.png",
    "images/orange-candy.png",
    "images/purple-candy.png",
    "images/red-candy.png",
    "images/yellow-candy.png",
  ];

  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {

    if (!squareBeingReplaced) {
      setSquareBeingDragged(null);
      return;
    }

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute("data-id"));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute("data-id"));

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    if (validMove) {
      currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    }
  };


  useEffect(() => {
    createBoard(width, setCurrentColorArrangement, candyColors);
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour(width, currentColorArrangement, setScoreDisplay);
      checkForRowOfFour(width, currentColorArrangement, setScoreDisplay);
      checkForColumnOfThree(width, currentColorArrangement, setScoreDisplay);
      checkForRowOfThree(width, currentColorArrangement, setScoreDisplay);
      moveIntoSquareBelow(width, currentColorArrangement, candyColors);
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [currentColorArrangement]);


  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            alt={candyColor}
            src={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoards score={scoreDisplay} />
    </div>
  );
};

export default App;
