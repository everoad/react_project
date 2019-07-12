import makeStyles from "@material-ui/core/styles/makeStyles";

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "#faf8fb"
  },
  appBar: {
    backgroundColor: "#fff",
    color: "#505050",
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
  menuButton: {
    marginRight: 36
  },
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
    backgroundImage: "linear-gradient(270deg,rgba(51,148,225,.18),transparent)",
    backgroundColor: "#584475",
    color: "#fff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundImage: "linear-gradient(270deg,rgba(51,148,225,.18),transparent)",
    backgroundColor: "#584475",
    color: "#fff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  drawerInfo: {
    width: "100%",
    color: "#fff",
    background: "url(/images/cover-2-lg.png)",
    backgroundSize: "cover",
    opacity: 0.8,
    height: "155px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  },
  pageTitle: {
    padding: theme.spacing(2, 1),
    color: "#555"
  },
  pagetitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

export default useStyles;
