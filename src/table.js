import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

function createData(label, name, value, type) {
  return { label, name, value, type };
}

const rows = [
  createData("A1", <TextField id="standard-basic" />, 1000, <TextField id="standard-basic" />),
  createData("B2", <TextField id="standard-basic" />, 100, <TextField id="standard-basic"  />),
  createData("T1", <TextField id="standard-basic" />, 75, <TextField id="standard-basic" />),
];

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer style={{paddingBottom: 20}}>
      <Table className={classes.table} size="small" aria-label="a dense table">
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

// import React from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

// function createData(label, name, value, type) {
//   return { label, name, value, type };
// }

// const rows = [
//   createData("A1", <TextField id="standard-basic" />, 1000, <TextField id="standard-basic" />),
//   createData("B2", <TextField id="standard-basic" />, 100, <TextField id="standard-basic"  />),
//   createData("T1", <TextField id="standard-basic" />, 75, <TextField id="standard-basic" />),
// ];

// const useStyles = makeStyles({
//   table: {
//     minWidth: 350,
//   },
// });

// export default function CustomizedTables() {
//   const classes = useStyles();

//   return (
//     <div>
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Label</StyledTableCell>
//             <StyledTableCell align="right">Name</StyledTableCell>
//             <StyledTableCell align="right">Value</StyledTableCell>
//             <StyledTableCell align="right">Type</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.label}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.name}</StyledTableCell>
//               <StyledTableCell align="right">{row.value}</StyledTableCell>
//               <StyledTableCell align="right">{row.type}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </div>
//   );
// }
