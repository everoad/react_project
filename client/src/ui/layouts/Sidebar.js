import React from "react";
import clsx from "clsx";
import useTheme from "@material-ui/core/styles/useTheme";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

export default function Sidebar({
  open,
  handleDrawerClose,
  classes,
  handleActive,
  sidebarData,
  active
}) {
  const theme = useTheme();

  return (
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
      open={open}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon style={{ color: "#fff" }} />
          ) : (
            <ChevronLeftIcon style={{ color: "#fff" }} />
          )}
        </IconButton>
      </div>
      <Divider />
      {open && <div className={classes.drawerInfo}>Hello World</div>}
      <List>
        {sidebarData.map((data, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={data.href}
            selected={active.href === data.href}
            onClick={() => handleActive(data)}
          >
            <ListItemIcon style={{ color: "#fff" }}>{data.icon}</ListItemIcon>
            <ListItemText primary={data.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
