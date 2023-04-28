
const checkForColumnOfFour = (width,currentColorArrangement) => {
    for  (let i =  0; i <= 39 ; i++) {
        const columnOfFour = [i, i +  width, i +  width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
  
        if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
              columnOfFour.forEach(square => currentColorArrangement[square] = '')
        }
      }
}

export default checkForColumnOfFour