import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DataForm from "./ticks";
import Graph from "./graph";
import SpeedDials from "./speedDial";
import { Table } from "@material-ui/core";
import CustomizedTables from "./table"
import CenteredGrid from './grid';
import Grid from '@material-ui/core/Grid';
import SettingsDial from './settings';

let drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  // menuButton: {
  //   marginRight: 36
  // },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(5),
    // [theme.breakpoints.up("lg")]: {
    //   width: theme.spacing(8) + 1,
    // },
    // backgroundColor: "gray"
    // backgroundColor: "black"
  },
  toolbar: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0,0,0,0),
    spacer: {
      padding: 10
    }
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    whiteSpace:"nowrap",
    width: "100%"
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    drawerWidth = 240;
  };

  const handleDrawerClose = () => {
    if (!open) {
      handleDrawerOpen();
    } else {
      setOpen(false);
    }
    // drawerWidth = 100;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          {open === true ? <SettingsDial/>  : null}
          <IconButton onClick={handleDrawerClose}>
            {open === false ? (
              <ChevronRightIcon/>
            ) : (   
              <div>
                <ChevronLeftIcon />
              </div>
            )}
          </IconButton>
        </div>
        <Divider />
        {open === true ? (
          <div>
            
            <h1>Live</h1>
            <Grid xs={12}>
            <CustomizedTables/>
            </Grid>
            {/* <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List> */}
            <Divider />
            <h1>Upload</h1>
            <Grid xs={12}>
            <CustomizedTables/>
            </Grid>
            {/* <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
          </div>
        ) : (
          <div />
        )}
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        <CenteredGrid/>
        {/* <Graph/> */}
        <SpeedDials/>
      </main>
    </div>
  );
}
