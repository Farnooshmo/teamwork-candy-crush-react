import { useEffect, useState } from "react";
import createBoard from "./components/createBoard";
import checkForColumnOfFour from "./components/checkForColumnOfFour";
import checkForColumnOfThree from "./components/checkForColumnOfThree";
import checkForRowOfFour from "./components/checkForRowOfFour";
import checkForRowOfThree from "./components/checkForRowOfThree";
import moveIntoSquareBelow from "./components/moveIntoSquareBelow";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import ScoreBoards from "./components/ScoreBoards";

const App = () => {
  const width = 8;
  const candyColors = [
    blueCandy,
    greenCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
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

    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + width,
    ];
    const validMove = validMoves.includes(squareBeingReplacedId);

    if (validMove) {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");
    }
    const isAColumnOfFour = checkForColumnOfFour(width, currentColorArrangement, setScoreDisplay);
    const isARowOfFour = checkForRowOfFour(width, currentColorArrangement, setScoreDisplay);
    const isAColumnOfThree = checkForColumnOfThree(width, currentColorArrangement, setScoreDisplay);
    const isARowOfThree = checkForRowOfThree(width, currentColorArrangement, setScoreDisplay);

    if (
      squareBeingReplacedId &&
      validMove
      && (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
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
