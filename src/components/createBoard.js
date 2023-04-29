
const createBoard = (width, setCurrentColorArrangement, candyColors) => {

    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
        randomColorArrangement.push(randomColor)

    }
    setCurrentColorArrangement(randomColorArrangement)
}

export default createBoard
