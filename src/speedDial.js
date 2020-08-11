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

const actions = [
  { icon: <LiveTvIcon />, name: 'Live' },
  { icon: <BackupIcon />, name: 'Uploaded' },
];

export default function SpeedDials() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('up');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
      <Fab className={classes.Fab} variant="extended" size="small" color="primary">
        <AddIcon className={classes.extendedIcon} />
        New Graph
      </Fab>
        {/* <SpeedDial
          ariaLabel="Add Graph"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        > 
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial> */}
      </div>
    </div>
  );
}
