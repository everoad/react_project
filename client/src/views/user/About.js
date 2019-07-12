import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div>ABOUT!!!!</div>
    </Paper>
  );
}
