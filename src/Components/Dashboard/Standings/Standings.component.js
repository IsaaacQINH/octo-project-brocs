import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";

function createData(pos, name, wins, losses, series, goals) {
  return { pos, name, wins, losses, series, goals };
}

const rows = [
  createData('1', 'Test', 6, 2, '16-2', '+27'),
  createData('2', 'Test', 6, 2, '16-2', '+27'),
  createData('3', 'Test', 6, 2, '16-2', '+27'),
  createData('4', 'Test', 6, 2, '16-2', '+27'),
  createData('5', 'Test', 6, 2, '16-2', '+27'),
  createData('6', 'Test', 6, 2, '16-2', '+27'),
  createData('7', 'Test', 6, 2, '16-2', '+27'),
  createData('8', 'Test', 6, 2, '16-2', '+27'),
  createData('9', 'Test', 6, 2, '16-2', '+27'),
  createData('10', 'Test', 6, 2, '16-2', '+27'),
];

export default function StandingsTable() {
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
              <TableCell align="center">u</TableCell>
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
