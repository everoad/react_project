import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import MarkdownEditor from "../../components/markdown/MarkdownEditor";

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function AboutEditor({ value, onChange }) {
  const classes = useStyles();

  return (
      <MarkdownEditor value={value} onChange={onChange} />
  );
}
