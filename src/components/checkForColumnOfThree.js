
const checkForColumnOfThree = (width, currentColorArrangement) => {
    for  (let i =  0; i <= 47 ; i++) {
        const columnOfThree = [i, i +  width, i +  width * 2]
        const decidedColor = currentColorArrangement[i]
  
        if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
              columnOfThree.forEach(square => currentColorArrangement[square] = '')
        }
      }
}

export default checkForColumnOfThree