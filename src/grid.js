import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from './graph';
import { Resizable, ResizableBox } from 'react-resizable';
import DataDropDown from './dataDropdown';
import DataForm from './ticks';

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

  return (
    <div className={classes.root} xs={12}>
      
      {/* <Grid xs={12} > */}
        {/* <ResizableBox> */}
        <Paper className={classes.paper}>
          <Grid xs={12}><Graph/></Grid>
          <Grid xs={12} style={{justifyContent: "flex-center"}}><DataDropDown/></Grid>
          {/* <Grid xs={3}><DataForm/></Grid> */}
        </Paper>
        {/* </ResizableBox> */}
      {/* </Grid> */}
      
    </div>
  );
}