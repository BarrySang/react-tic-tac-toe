import Grid from "./Grid";

function Home({
  handleCellClick,
  isGameOver,
  divValues,
  playerAction,
  selectedCell,
  setSelectedCell,
  currentTurn,
  gameStateText,
  gameOver,
}) {
  return (
    <div>
      <h1>Tic-tac-Toe</h1>
      <p>Start game</p>

      <p>{gameStateText}</p>

      <Grid
        gameOver={gameOver}
        handleCellClick={handleCellClick}
        divValues={divValues}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
      />
    </div>
  );
}

export default Home;
