import React from "react";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles(theme => ({
  hover: {
    transition: "all .1s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
      "-webkit-filter": "brightness(80%)"
    }
  },
  root: {
    width: "310px",
    padding: theme.spacing(1, 1, 3, 1)
  },
  container: {
    borderRadius: "5px",
    overflow: "hidden"
  },
  header: {
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    overflow: "hidden",
    height: "140px"
  },
  body: {},
  image: {
    width: "100%"
  },
  title: {
    padding: theme.spacing(1),
    fontSize: "16px",
    fontWeight: 550,
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer"
    }
  },
  subTitle: {
    width: "70%",
    padding: theme.spacing(0, 1, 1, 1),
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    color: "#505050"
  },
  footer: {
    padding: theme.spacing(1),
    textAlign: "right"
  }
}));

export default function GridItem(props) {
  const classes = useStyles();

  const { item, handleClickItem } = props;

  const { image, type, title, regDtime } = item;

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <header className={classes.header}>
          <div
            className={clsx(classes.header, classes.hover)}
            style={{
              background: `url(${
                image
                  ? `data:image/jpg;base64,${image}`
                  : "/images/cover-2-lg.png"
              }) no-repeat center center`,
              backgroundSize: "cover"
            }}
            onClick={() => handleClickItem(item)}
          />
        </header>
        <div className={classes.body}>
          <div className={classes.title} onClick={() => handleClickItem(item)}>
            <span>[ {type} ]</span>
            &nbsp;{title}
          </div>
          <div className={classes.subTitle}>
            <DateRangeIcon fontSize="small" />
            <div>
              &nbsp;
              {regDtime ? regDtime : "2019-07-08"}
            </div>
          </div>
          <div className={classes.footer}>
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={() => handleClickItem(item)}
            >
              Read More
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}
