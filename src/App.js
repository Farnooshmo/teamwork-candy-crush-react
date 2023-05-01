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

    const validImages = () => {
      const imageDragged = squareBeingDragged.getAttribute("src");
      const difference = squareBeingDraggedId - squareBeingReplacedId;
      let direction = ""
      if (difference === 1) {
        direction = "left";
      }
      if (difference === -1) {
        direction = "right";
      }
      if (difference === width) {
        direction = "up";
      }
      if (difference === -width) {
        direction = "down";
      }

      const rightImageReplaced = currentColorArrangement[squareBeingReplacedId + 1]
      const secondRightImageReplaced = currentColorArrangement[squareBeingReplacedId + 2]
      const leftImageReplaced = currentColorArrangement[squareBeingReplacedId - 1]
      const secondLeftImageReplaced = currentColorArrangement[squareBeingReplacedId - 2]
      const upImageReplaced = currentColorArrangement[squareBeingReplacedId - width]
      const secondUpImageReplaced = currentColorArrangement[squareBeingReplacedId - width * 2]
      const downImageReplaced = currentColorArrangement[squareBeingReplacedId + width]
      const secondDownImageReplaced = currentColorArrangement[squareBeingReplacedId + width * 2]

      if (direction !== "left" && imageDragged === rightImageReplaced && imageDragged === secondRightImageReplaced) {
        return true;
      }
      if (direction !== "right" && direction !== "left" && imageDragged === rightImageReplaced && imageDragged === leftImageReplaced) {
        return true;
      }
      if (direction !== "right" && imageDragged === leftImageReplaced && imageDragged === secondLeftImageReplaced) {
        return true;
      }
      if (direction !== "down" && imageDragged === upImageReplaced && imageDragged === secondUpImageReplaced) {
        return true;
      }
      if (direction !== "down" && direction !== "up" && imageDragged === upImageReplaced && imageDragged === downImageReplaced) {
        return true;
      }
      if (direction !== "up" && imageDragged === downImageReplaced && imageDragged === secondDownImageReplaced) {
        return true;
      }
      else {
        return false;
      }
    }



    if (validMove && validImages()) {
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
