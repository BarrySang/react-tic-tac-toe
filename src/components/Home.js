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
  startGame,
  restartGame,
  gameHistory,
}) {
  return (
    <div>
      <h1>Tic-tac-Toe</h1>

      {gameOver ? (
        <button onClick={startGame}>Start game</button>
      ) : (
        <button onClick={restartGame}>Restart Game</button>
      )}
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
