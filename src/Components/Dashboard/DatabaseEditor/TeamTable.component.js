import EnhancedTable, { createTeamData } from "./Table.component";

const TeamTable = ({teams}) => {
  const rows = [];
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
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
    },
  ];

  teams.forEach(t => {
    rows.push(createTeamData(t.name, t.match_wins + t.match_losses, t.match_wins, t.match_losses));
  });

  return <EnhancedTable head={headCells} rows={rows} />
}

export default TeamTable;
