const checkForColumnOfThree = (width, currentColorArrangement, setScoreDisplay) => {

  const lastIndex = (width * width) - (width * 2);
  for (let i = 0; i < lastIndex; i++) {
    const columnOfThree = [i, i + width, i + width * 2];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === "images/blank-candy.png";
    const isMatch = columnOfThree.every((square) => currentColorArrangement[square] === decidedColor);

    if (isMatch && !isBlank) {
      setScoreDisplay((score) => score + 3);
      columnOfThree.forEach((square) => (currentColorArrangement[square] = "images/blank-candy.png"));
      return true;
    }
  }
};

export default checkForColumnOfThree;
