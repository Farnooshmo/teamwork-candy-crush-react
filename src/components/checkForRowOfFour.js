const checkForRowOfFour = (width, currentColorArrangement, setScoreDisplay) => {

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width - 3; j++) {
      let firstIndex = j + (width * i);
      const rowOfFour = [firstIndex, firstIndex + 1, firstIndex + 2, firstIndex + 3];
      const decidedColor = currentColorArrangement[firstIndex];
      const isBlank = currentColorArrangement[i] === "images/blank-candy.png";
      const isMatch = rowOfFour.every((square) => currentColorArrangement[square] === decidedColor);

      if (isMatch && !isBlank) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = "images/blank-candy.png")
        );
        return true;
      }
    }
  }
};

export default checkForRowOfFour;
