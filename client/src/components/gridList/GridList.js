import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import GridItem from "./GridItem";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  }
}));

export default function GridList({ data, handleClickItem, getItems, search }) {
  const classes = useStyles();

  const [state, setState] = useState({
    start: 0,
    length: 15
  });

  const { items, itemCount } = data;

  return (
    <div className={classes.root}>
      {items.map((item, i) => (
        <GridItem key={i} item={item} handleClickItem={handleClickItem} />
      ))}
    </div>
  );
}
