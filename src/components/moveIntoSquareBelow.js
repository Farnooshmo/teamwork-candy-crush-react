const moveIntoSquareBelow = (width, currentColorArrangement, candyColors) => {
  const lastIndex = width * width - width;
  for (let i = 0; i < lastIndex; i++) {

    if (i < width && currentColorArrangement[i] === "images/blank-candy.png") {
      const randomNumber = Math.floor(Math.random() * candyColors.length);
      currentColorArrangement[i] = candyColors[randomNumber];
    }

    if (currentColorArrangement[i + width] === "images/blank-candy.png") {
      currentColorArrangement[i + width] = currentColorArrangement[i];
      currentColorArrangement[i] = "images/blank-candy.png";
    }
  }
};

export default moveIntoSquareBelow;
