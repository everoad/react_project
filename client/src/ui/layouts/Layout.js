import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Sidebar from "./Sidebar";
import sidebarData from "./sidebar.data";
import useStyles from "./layout.style";
import { history } from "../../utils/history";

const findActive = () => {
  let active = sidebarData.filter(
    data => data.href === history.location.pathname
  );

  if (active.length === 0) {
    active = sidebarData.filter(
      data => history.location.pathname.indexOf(data.href) === 0
    );
  }

  return {
    text: active.length > 0 ? active[0].text : "",
    href: active.length > 0 ? active[0].href : ""
  };
};

export default function Layout({ children }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState(findActive());

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleActive(item) {
    setActive({
      text: item.text,
      href: item.href
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        classes={classes}
        active={active}
      />
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        classes={classes}
        active={active}
        handleActive={handleActive}
        sidebarData={sidebarData}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
