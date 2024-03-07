import Grid from "./Grid"

function Home ({isGameOver, divValues, playerAction, selectedCell, setSelectedCell, currentTurn, gameStatus}) {
    return (
        <div>
            <h1>Tic-tac-Toe</h1>
            <p>Start game</p>
            
                <p>{gameStatus}</p>
            
            <Grid divValues={divValues} selectedCell={selectedCell} setSelectedCell={setSelectedCell} />
        </div>
    )
}

export default Home