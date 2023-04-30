import blank from "../images/blank-candy.png";
const moveIntoSquareBelow = (width, currentColorArrangement, candyColors) => {
  const lastIndex = width * width - width;
  for (let i = 0; i < lastIndex; i++) {
    if (i < width && currentColorArrangement[i] === blank) {
      const randomNumber = Math.floor(Math.random() * candyColors.length);
      currentColorArrangement[i] = candyColors[randomNumber];
    }
    if (currentColorArrangement[i + width] === blank) {
      currentColorArrangement[i + width] = currentColorArrangement[i];
      currentColorArrangement[i] = blank;
    }
  }
};

export default moveIntoSquareBelow;
