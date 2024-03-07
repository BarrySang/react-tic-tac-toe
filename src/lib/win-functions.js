// function to check if a player has won
export function checkWin(boardArray, letter, positions) {
    
    // console.log('turn letter', letter)
    // console.log('positions', positions)
    
    // let positions = [0, 3, 6]
    
    
    // check for vertical win
    if (verticalWin(positions, letter, boardArray)) {
      console.log('vertical win')
      return true
    }

    // check for horizontal win
    if (horizontalWin(positions, letter, boardArray)) {
      console.log('horizontal win')
      return true
    }

    // check for diagonal win
    if (diagonalWin(positions, letter, boardArray)) {
      console.log('diagonal win: true')
      return true
    }

    // return false if no 'win' condition has been met
    return false
    
}

// check for vertical win
export function verticalWin(positions=[], letter, boardArray) {
    // check for a vertical win in every item
    for ( let i = 0; i < positions.length; i++) {
        let prevPos = positions[i]-3
        let nextPos = positions[i]+3
        if (isMatched(prevPos, positions[i], nextPos, boardArray) === true) {
          return true
        }
    }

    return false
}

const boardMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]

function getRowColumn(matrix, item) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === item) {
        return {row, col}
      }
    }
  }

  return null
}

// check if cells are within range
function areCellsOutOfRange(lowerLimit, upperLimit, prevPos, currentPos, nextPos) {

  if (
    prevPos < lowerLimit ||
    prevPos > upperLimit ||
    currentPos < lowerLimit ||
    currentPos > upperLimit ||
    nextPos < lowerLimit ||
    nextPos > upperLimit
  ) {
    return true;
  }
  
    return false
  }

// check for horizontal win
export function horizontalWin(positions=[], letter, boardArray) {
  // iterate over each cell position
  for (let i = 0; i < positions.length; i++) {
      let prevPos = positions[i]-1
  let nextPos = positions[i]+1
      if (areCellsOutOfRange(0, 8, prevPos, positions[i], nextPos)) {
        
        continue
      } else {
        if (getRowColumn(boardMatrix, prevPos).row === getRowColumn(boardMatrix, positions[i]).row && getRowColumn(boardMatrix, positions[i]).row === getRowColumn(boardMatrix, nextPos).row) {
          
          if (isMatched(prevPos, positions[i], nextPos, boardArray)) {
            return true
          } else {
            continue
          }
        } else {
            
            continue
        }  
      }
  }

  // if win conditions have not been met by any cell
  return false
}

function diagonalWinHalf(positions=[], letter, boardArray, cellDistance) {
  
  // iterate over each cell position
  for (let i = 0; i < positions.length; i++) {
      
      let prevPos = positions[i]-cellDistance
  let nextPos = positions[i]+cellDistance
      
      if (areCellsOutOfRange(0, 8, prevPos, positions[i], nextPos)) {
        
        continue
      } else {
          // check if any rows are matched
        if (getRowColumn(boardMatrix, prevPos).row === getRowColumn(boardMatrix, positions[i]).row || getRowColumn(boardMatrix, positions[i]).row === getRowColumn(boardMatrix, nextPos).row) {
        
            continue
        } else if (getRowColumn(boardMatrix, prevPos).col === getRowColumn(boardMatrix, positions[i]).col || getRowColumn(boardMatrix, positions[i]).col === getRowColumn(boardMatrix, nextPos).col) {
          
          continue
        } else {
          // check if value are similar
            if (isMatched(prevPos, positions[i], nextPos, boardArray)) {
              
              return true
            } else {
              continue
            }
        }  
      }
  }

  // if win conditions have not been met by any cell
  return false
}

export function diagonalWin(positions=[], letter, boardArray) {
  for (let i = 0; i < 2; i++) {
      /**
       * first diagonal
       */
      if (diagonalWinHalf(positions, letter, boardArray, 2)) {
          return true
      }

      /**
       * second diagonal
       */
      if (diagonalWinHalf(positions, letter, boardArray, 4)) {
          return true
      }
  }
  

  // if win conditions have not been met by any cell
  return false
}

// check if cells are matched with adjacent cells
export function isMatched(prev, current, next, boardArray) {
  // check if values are within range
  if (areCellsOutOfRange(0, 8, prev, current, next)) {
    return false
  }
  if ((boardArray[prev][prev + 1] === boardArray[current][current + 1]) && (boardArray[current][current + 1] === boardArray[next][next + 1])) {
    return true
  } else {
    return false
  }
}