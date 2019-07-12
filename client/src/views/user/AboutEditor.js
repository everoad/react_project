import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import MarkdownEditor from "../../components/markdown/MarkdownEditor";

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function AboutEditor(props) {
  const classes = useStyles();

  const { discription, onChangeDesc } = props;

  return (
    <div>
      <MarkdownEditor value={discription} onChange={onChangeDesc} />
    </div>
  );
}
