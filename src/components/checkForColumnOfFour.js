const checkForColumnOfFour = (width, currentColorArrangement, setScoreDisplay) => {

  const lastIndex = (width * width) - (width * 3)
  for (let i = 0; i < lastIndex; i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === "images/blank-candy.png";
    const isMatch = columnOfFour.every((square) => currentColorArrangement[square] === decidedColor);

    if (isMatch && !isBlank) {
      setScoreDisplay((score) => score + 4);
      columnOfFour.forEach((square) => (currentColorArrangement[square] = "images/blank-candy.png"));
      return true;
    }
  }
};

export default checkForColumnOfFour;
