function Grid ({divValues, selectedCell, setSelectedCell}) {
    // console.log(divValues)
    return (
        <div className="grid-container">
            
            {
                Object.keys(divValues).map(index => (
                    <div key={index} id={index} className="grid-square" onClick={(e) => setSelectedCell(e.target.id)}>
                        {
                            divValues[index][parseInt(index)+1]
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Grid