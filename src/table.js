import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useTracked } from './globalState';

const useStyles = makeStyles({
  table: {
    // minWidth: 350,
  },
});

function createData(label, name, value, type) {
  return { label, name, value, type };
}

export default function CustomizedTables() {
  const classes = useStyles();

  const initialState = {
    rows: []
  };

  const [tableState, setTableState] = useState(initialState);
  const [state, setState] = useTracked();

  useEffect(() => {
    r = []
    Object.keys(state.data).forEach((key) => {
      r.append(createData(key, <TextField id="name-${key}"/>, state.data[key][state.data[key].length-1][1], <TextField id="type-${key}"/>))
    });
    setTableState({rows: r});
  })

  return (
    <TableContainer style={{paddingBottom: 20}}>
      <Table className={classes.table} size="small" aria-label="live data table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Label</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}