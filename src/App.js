import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { checkWin } from "./lib/win-functions";

function App() {
  const [divValues, setDivValues] = useState([
    {
      1: "1",
    },
    {
      2: "2",
    },
    {
      3: "3",
    },
    {
      4: "4",
    },
    {
      5: "5",
    },
    {
      6: "6",
    },
    {
      7: "7",
    },
    {
      8: "8",
    },
    {
      9: "9",
    },
  ]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedCell, setSelectedCell] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [gameStateText, setgameStateText] = useState(
    "Player " + currentTurn + "'s turn"
  );
  const [gameHistory, setGameHistory] = useState([]);

  const turnLetter = {
    1: "X",
    2: "O",
  };

  // handle player cell selection
  useEffect(() => {
    console.log(selectedCell);

    // update value of selected cell
    updateCellValue(selectedCell, "X");
  }, [selectedCell]);

  // update cell value
  function updateCellValue(index, value) {
    let actualSelectedCell = parseInt(index) + 1;

    let newDivValues = divValues.map((divValue) => {
      if (divValue[actualSelectedCell]) {
        return {
          ...divValue,
          [actualSelectedCell]: value,
        };
      } else {
        return divValue;
      }
    });
    // console.log(newDivValues)
    setDivValues(newDivValues);
  }

  // check for win and change turn after a player's action
  useEffect(() => {
    // check if all cells have been filled and no player has won
    if (boardFilled(divValues) && !playerWins(divValues)) {
      setgameStateText("stalemate");
      setGameOver(true);
    } else if (playerWins(divValues)) {
      setgameStateText(`player ${currentTurn} wins`);
      setGameHistory((prevHistory) => {
        return [...prevHistory, currentTurn];
      });
      // disable actions on board and display 'play again' option
      setGameOver(true);
    } else {
      toggleTurn();
    }
  }, [divValues]);

  useEffect(() => {
    console.log(gameHistory);
  }, [gameHistory]);

  // listen for change in turn
  useEffect(() => {
    // check if game has started
    if (gameStarted(divValues)) {
      if (currentTurn === 2) {
        // make cell selection for cpu
        let cpuSelectedCell = cpuCellSelection();

        // uodate cell value
        updateCellValue(cpuSelectedCell, "O");
      }
    }
  }, [currentTurn]);

  function handleCellClick(e) {
    setSelectedCell(e.target.id);
  }

  /**
   *
   * @param {array} cells
   * @returns boolean
   */
  function gameStarted(cells) {
    // console.log('cells in gameStarted ', cells)
    for (const cell of cells) {
      const key = Object.keys(cell)[0];
      const value = cell[key];

      if (key !== value) {
        return true;
      }
    }

    return false;
  }

  function playerWins(cells) {
    if (
      checkWin(
        divValues,
        turnLetter[currentTurn],
        getObjectPositions(turnLetter[currentTurn])
      )
    ) {
      return true;
    }

    return false;
  }

  function boardFilled(cells) {
    if (atLeastOneCellEmpty(cells)) {
      return false;
    } else {
      return true;
    }
  }

  function isGameOver(cells) {
    // check for win
    if (
      checkWin(
        divValues,
        turnLetter[currentTurn],
        getObjectPositions(turnLetter[currentTurn])
      )
    ) {
      // setgameStateText(`player ${currentTurn} wins`);
      return true;
    }

    // check if all cells have been filled
    if (atLeastOneCellEmpty(cells)) {
      return false;
    } else {
      return true;
    }
  }

  function isCPUInputValid(cell) {
    // check if value of selected cell is equal to the its key in divValues array
    if (
      parseInt(divValues[cell][cell + 1]) &&
      parseInt(divValues[cell][cell + 1])
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * check if all cells are filled
   * @param {array} cells
   * @returns boolean
   */
  function atLeastOneCellEmpty(cells) {
    return cells.some((cell) => {
      const key = Object.keys(cell)[0];
      const value = cell[key];

      return key === value;
    });
  }

  // function to get all indices of objects with the given values
  function getObjectPositions(letter) {
    let positions = [];
    divValues.forEach((obj, index) => {
      // Check if the object contains the value of letter
      if (Object.values(obj).includes(letter)) {
        positions.push(index);
      }
    });

    return positions;
  }

  // function to handle cpu turn
  function cpuCellSelection() {
    let cell = generateRandomNumber();

    if (cell && isCPUInputValid(cell)) {
      // console.log(cell)
      return cell;
    } else {
      // console.log(cell)
      return cpuCellSelection();
    }
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 8);
  }

  function toggleTurn() {
    if (currentTurn === 1) {
      setCurrentTurn(2);
      setgameStateText(`Player ${currentTurn}'s turn`);
    } else {
      setCurrentTurn(1);
      setgameStateText(`Player ${currentTurn}'s turn`);
    }
  }

  function startGame() {
    setGameOver(false);
    if (gameHistory.length) {
      console.log(gameHistory.length);
      resetCells();
    }
  }

  function resetCells() {
    setDivValues([
      {
        1: "1",
      },
      {
        2: "2",
      },
      {
        3: "3",
      },
      {
        4: "4",
      },
      {
        5: "5",
      },
      {
        6: "6",
      },
      {
        7: "7",
      },
      {
        8: "8",
      },
      {
        9: "9",
      },
    ]);
  }

  function restartGame() {
    resetCells();

    setGameOver(true);
  }

  return (
    <div className="app-container">
      <Home
        restartGame={restartGame}
        startGame={startGame}
        isGameOver={isGameOver}
        currentTurn={currentTurn}
        divValues={divValues}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        gameStateText={gameStateText}
        handleCellClick={handleCellClick}
        gameOver={gameOver}
      />
    </div>
  );
}

export default App;
