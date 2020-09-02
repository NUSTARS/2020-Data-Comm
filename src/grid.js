import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from './graph';
import DataDropDown from './dataDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  var selected;
  const selectionHandler = data => {selected = data;}

  return (
    <div className={classes.root} xs={12}>

        <Paper className={classes.paper}>
          <Grid xs={12}>
            <Graph selected={selected}/>
          </Grid>
          <Grid xs={12} style={{justifyContent: "flex-center"}}>
            <DataDropDown onChange={selectionHandler}/>
          </Grid>
        </Paper>
      
    </div>
  );
}