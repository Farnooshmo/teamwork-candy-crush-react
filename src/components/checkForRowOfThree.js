import blank from "../images/blank-candy.png";
const checkForRowOfThree = (width, currentColorArrangement, setScoreDisplay) => {
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 4; j++) {
      let firstIndex = j + width * i;
      const rowOfThree = [firstIndex, firstIndex + 1, firstIndex + 2];
      const decidedColor = currentColorArrangement[firstIndex];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }
};

export default checkForRowOfThree;
