import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./FullScreenDialog.css";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundImage: "linear-gradient(270deg,rgba(51,148,225,.18),transparent)",
    backgroundColor: "#584475"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, children }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <ReactCSSTransitionGroup
            transitionName="content"
            transitionAppear={true}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppearTimeout={500}
          >
            {children}
          </ReactCSSTransitionGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
