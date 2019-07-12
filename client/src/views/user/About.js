import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import MarkdownText from "../../components/markdown/MarkdownText";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./transition.css";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export default function About() {
  const classes = useStyles();

  const [profile, setProfile] = useState("");

  return (
    <Paper className={classes.root}>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppearTimeout={500}
      >
        <MarkdownText value={profile} />
      </ReactCSSTransitionGroup>
    </Paper>
  );
}
