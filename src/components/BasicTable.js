import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { isMobile } from 'react-device-detect';

const width = isMobile ? 500 : 900;

console.log('isMobile', isMobile);
const useStyles = makeStyles({
  table: {
    width: width,
  },
  tableCell: {
    fontWeight: 'bold',
  },
  tableRow: {
    width: 100,
  },
  containerDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function BasicTable({ rows }) {
  const classes = useStyles();

  return (
    rows.length !== 0 && (
      <div className={classes.containerDiv}>
        <TableContainer component={Paper} style={{ width: width }}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell></TableCell>
                <TableCell className={classes.tableCell}>
                  Country name
                </TableCell>
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
                <TableRow className={classes.tableRow} key={row.code}>
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
      </div>
    )
  );
}
