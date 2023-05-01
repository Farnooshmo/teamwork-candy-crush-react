const checkForRowOfThree = (width, currentColorArrangement, setScoreDisplay) => {

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width - 2; j++) {
      let firstIndex = j + (width * i);
      const rowOfThree = [firstIndex, firstIndex + 1, firstIndex + 2];
      const decidedColor = currentColorArrangement[firstIndex];
      const isBlank = currentColorArrangement[i] === "images/blank-candy.png";
      const isMatch = rowOfThree.every((square) => currentColorArrangement[square] === decidedColor);

      if (isMatch && !isBlank) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach((square) => (currentColorArrangement[square] = "images/blank-candy.png"));
        return true;
      }
    }
  }
};

export default checkForRowOfThree;
