import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing(0, 0.25)
  },
  item: {
    maxWidth: "25px",
    maxHeight: "30px",
    minWidth: "25px",
    minHeight: "30px"
  },
  active: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}));

export default function Pagination({
  itemCount,
  page,
  length,
  handleClickPageIndex
}) {
  const classes = useStyles();

  const indent = 4;
  let pageCount =
    length === 0 && itemCount === 0 ? 1 : Math.ceil(itemCount / length);

  let idxs = [];
  let start = page - indent > -1 ? page - indent : 0;
  let end = page + indent < pageCount - 1 ? page + indent : pageCount - 1;

  for (let i = start; i <= end; i++) {
    idxs.push(i + 1);
  }
  if (idxs[0] === 2) {
    idxs = [1].concat(idxs);
  } else if (idxs[0] > 2) {
    idxs = [1, "..."].concat(idxs);
  }

  if (idxs[idxs.length - 1] === pageCount - 1) {
    idxs = idxs.concat([pageCount]);
  } else if (idxs[idxs.length - 1] < pageCount - 1) {
    idxs = idxs.concat(["...", pageCount]);
  }

  if (idxs.length === 0) {
    idxs.push(1);
  }

  const handleClick = idx => {
    if (idx < 0 || idx > pageCount - 1 || idx === page) {
      return;
    }
    handleClickPageIndex(idx);
  };

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.button}
        size="small"
        color="primary"
        onClick={() => handleClick(page - 1)}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <div className={classes.list}>
        {idxs.map((i, key) => {
          return (
            <Button
              className={clsx(classes.button, classes.item)}
              variant={i === page + 1 ? "contained" : "text"}
              color="primary"
              size="small"
              key={key}
              onClick={() => handleClick(i - 1)}
            >
              {i}
            </Button>
          );
        })}
      </div>
      <IconButton
        size="small"
        className={classes.button}
        color="primary"
        onClick={() => handleClick(page + 1)}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
