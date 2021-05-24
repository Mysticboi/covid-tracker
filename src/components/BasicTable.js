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
    minWidth: 650,
  },
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function BasicTable(props) {
  const classes = useStyles();
  const rows = props.latestCovidCountries;

  return (
    rows.length !== 0 && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Country name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="right">
                Confirmed
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="right">
                Recovered
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="right">
                Critical
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">
                Deaths
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.country}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(row.confirmed)}
                </TableCell>
                <TableCell align="right">
                  {numberWithCommas(row.recovered)}
                </TableCell>
                <TableCell align="right">
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
