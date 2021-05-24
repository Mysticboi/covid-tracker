import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: window.width,
  },
  tableCell: {
    fontWeight: 'bold',
  },
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function BasicTable({ rows }) {
  const classes = useStyles();

  return (
    rows.length !== 0 && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell className={classes.tableCell}>Country name</TableCell>
              <TableCell className={classes.tableCell} align="center">
                Confirmed
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Recovered
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Critical
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Deaths
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.code}>
                <TableCell
                  style={{ fontWeight: 'bold', width: 10 }}
                  align="left"
                >
                  {i + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.country}
                </TableCell>

                <TableCell align="center">
                  {numberWithCommas(row.confirmed)}
                </TableCell>
                <TableCell align="center">
                  {numberWithCommas(row.recovered)}
                </TableCell>
                <TableCell align="center">
                  {numberWithCommas(row.critical)}
                </TableCell>
                <TableCell align="center">
                  {numberWithCommas(row.deaths)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
