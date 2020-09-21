import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import BackupIcon from '@material-ui/icons/Backup';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SettingsIcon from '@material-ui/icons/Settings';
import PublishIcon from '@material-ui/icons/Publish';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    // marginTop: theme.spacing(1),
    height: 40,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
}));

const actions = [
  { icon: <PublishIcon />, name: 'Upload' },
  { icon: <SaveIcon />, name: 'Save' },
];

export default function SettingsDial() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('right');
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
        <SpeedDial
          FabProps={{size: "small"}}
          ariaLabel="Settings"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SettingsIcon />}
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
        </SpeedDial>
      </div>
    </div>
  );
}
