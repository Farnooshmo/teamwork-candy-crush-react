
const createBoard = (width, setCurrentColorArrangement) => {
    
    const candyColors = ["orange","blue","yellow","green","purple","red"]

    const randomColorArrangement = [] 
    for (let i= 0; i< width * width ;i++) {
     const randomColor = candyColors[Math.floor(Math.random()* candyColors.length)]
     randomColorArrangement.push(randomColor)
       
     }
     setCurrentColorArrangement(randomColorArrangement)
}

export default createBoard
