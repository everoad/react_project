import React, { Fragment } from "react";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import DateRangeIcon from "@material-ui/icons/DateRange";

import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

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
    padding: theme.spacing(2, 1, 1, 1),
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
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1)
  },
  buttons: {
    display: "flex",
    alignItems: "center"
  }
}));

function GridItem(props) {
  const classes = useStyles();

  const {
    item,
    handleClickItem,
    auth,
    handleClickEdit,
    handleClickDelete
  } = props;

  const { image, imageType, type, title, regDtime } = item;

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <header className={classes.header}>
          <div
            className={clsx(classes.header, classes.hover)}
            style={{
              background: `url(${
                image
                  ? `data:image/${imageType};base64,${image}`
                  : "/images/cover-2-lg.png"
              }) no-repeat center center`,
              backgroundSize: "cover"
            }}
            onClick={() => handleClickItem(item)}
          />
        </header>
        <div className={classes.body}>
          <Typography
            variant="subtitle1"
            noWrap={true}
            className={classes.title}
            onClick={() => handleClickItem(item)}
          >
            <span>[ {type} ]</span>
            &nbsp;{title}
          </Typography>
          <div className={classes.subTitle}>
            <DateRangeIcon style={{ fontSize: "14px" }} />
            <div>
              &nbsp;
              {regDtime}
            </div>
          </div>
          <div className={classes.footer}>
            <div className={classes.buttons}>
              {auth.loggingIn && (
                <Fragment>
                  <IconButton
                    size="small"
                    onClick={() => handleClickEdit(item)}
                  >
                    <EditIcon style={{ fontSize: "18px" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleClickDelete(item)}
                  >
                    <DeleteIcon style={{ fontSize: "18px" }} />
                  </IconButton>
                </Fragment>
              )}
            </div>
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

const mapStateToProps = state => {
  return {
    auth: state.authentication
  };
};

export default connect(mapStateToProps)(GridItem);
