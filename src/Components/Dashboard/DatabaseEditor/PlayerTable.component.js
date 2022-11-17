import EnhancedTable, { createPlayerData } from "./Table.component";

const PlayerTable = ({player}) => {
  const rows = [];
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Player',
    },
    {
      id: 'playerid',
      numeric: true,
      disablePadding: false,
      label: 'Player ID',
    },
    {
      id: 'team',
      numeric: true,
      disablePadding: false,
      label: 'Team',
    },
    {
      id: 'matches',
      numeric: true,
      disablePadding: false,
      label: 'Matches Played',
    },
    {
      id: 'wins',
      numeric: true,
      disablePadding: false,
      label: 'Wins',
    },
    {
      id: 'losses',
      numeric: true,
      disablePadding: false,
      label: 'Losses',
    }
  ];

  player.forEach(p => {
    rows.push(createPlayerData(p.name, p.player_id, p.team.name, p.matches_played, p.matches_wins, p.matches_played - p.matches_wins));
  });

  return <EnhancedTable head={headCells} rows={rows} />
}

export default PlayerTable;