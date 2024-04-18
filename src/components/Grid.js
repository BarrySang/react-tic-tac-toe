function Grid({
  gameOver,
  divValues,
  selectedCell,
  setSelectedCell,
  handleCellClick,
}) {
  // console.log(divValues)
  return (
    <div className="grid-container">
      {Object.keys(divValues).map((index) => (
        <div
          key={index}
          id={index}
          className="grid-square"
          onClick={gameOver ? null : handleCellClick}
        >
          {divValues[index][parseInt(index) + 1]}
        </div>
      ))}
    </div>
  );
}

export default Grid;
