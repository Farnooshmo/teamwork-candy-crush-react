import blank from "../images/blank-candy.png";
const checkForRowOfFour = (width, currentColorArrangement) => {
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 3; j++) {
      let firstIndex = j + width * i;
      const rowOfFour = [
        firstIndex,
        firstIndex + 1,
        firstIndex + 2,
        firstIndex + 3,
      ];
      const decidedColor = currentColorArrangement[firstIndex];

      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }
};

export default checkForRowOfFour;
