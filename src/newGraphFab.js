import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import BackupIcon from '@material-ui/icons/Backup';
import AddIcon from '@material-ui/icons/Add';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 100,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  Fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function NewGraphFab() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
      <Fab className={classes.Fab} variant="extended" size="small" color="primary" disabled='true'>
        <AddIcon className={classes.extendedIcon} />
        New Graph
      </Fab>
      </div>
    </div>
  );
}
