const Scoreboard = ({blue, orange, match}) => {
    return (
        <>
            format: {match?.format || "---"}<br />
            blue: {blue?.name || "null"} Wins: {match?.blue_wins || 0}<br />
            orange: {orange?.name || "null"} Wins: {match?.orange_wins || 0}<br />
        </>
    );
}

export default Scoreboard;