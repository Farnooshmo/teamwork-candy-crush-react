
const checkForRowOfThree = (width, currentColorArrangement) => {
    for  (let i =  0; i <= 7 ; i++) {
        for (let j = 0; j <= 4; j++) {
          let firstIndex = j + (width * i)
          const rowOfThree = [firstIndex, firstIndex + 1, firstIndex + 2]
          const decidedColor = currentColorArrangement[firstIndex]
  
        if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
              rowOfThree.forEach(square => currentColorArrangement[square] = '')
        }
        }
      }
}

export default checkForRowOfThree