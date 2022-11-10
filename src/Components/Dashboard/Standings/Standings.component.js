import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {supabase} from "../../../Helper/supabaseClient";

function createData(pos, name, wins, losses, series, goals) {
  return { pos, name, wins, losses, series, goals };
}

const StandingsTable = ({project}) => {
  const [rows, setRows] = useState([]);

  useEffect(async () => {
    try {
      if (!project) {
        setRows([]);
        return 0;
      }

      const {data} = await supabase
          .from('team')
          .select('name, match_wins, match_losses, series_wins, series_losses')
          .eq('project_id', project)
          .order('match_wins', {ascending: false});

      if (!data) {
        setRows([]);
        return 0;
      }

      setRows(data.map((value, index) =>
          createData(
              index + 1,
              value.name,
              value.match_wins,
              value.match_losses,
              `${value.series_wins}-${value.series_losses}`,
              'N/A'
          )
      ));
    } catch (e) {
      console.error(e)
    }
  }, [project]);

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} aria-label="standings">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Pos</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Wins</TableCell>
            <TableCell align="right">Losses</TableCell>
            <TableCell align="right">Series</TableCell>
            <TableCell align="right">Goal diff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">•▲▼</TableCell>
              <TableCell align="left">{row.pos}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.wins}</TableCell>
              <TableCell align="right">{row.losses}</TableCell>
              <TableCell align="right">{row.series}</TableCell>
              <TableCell align="right">{row.goals}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StandingsTable;
