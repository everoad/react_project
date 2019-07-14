import React, { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import SettingsIcon from "@material-ui/icons/Settings";

import { connect } from "react-redux";

import MarkdownText from "../../components/markdown/MarkdownText";
import DefaultDialog from "../../components/dialog/DefaultDialog";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import AboutEditor from "./AboutEditor";

import * as service from "../../services/user";

import "./transition.css";

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  header: {
    borderBottom: "1px solid #eee",
    padding: theme.spacing(2)
  },
  body: {
    padding: theme.spacing(2),
    minHeight: "400px"
  }
}));

function About({ auth }) {
  const classes = useStyles();

  const [editOpen, setEditOpen] = useState(false);

  const [profile, setProfile] = useState("");

  const [editProfile, setEditProfile] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const res = await service.getProfile();
      setProfile(res.data.profile);
    }

    getProfile();
  }, []);


  const handleEditOpen = () => {
    setEditProfile(profile);
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);

  const handleClickSave = async () => {
    const res = await service.editProfile({
      profile: editProfile
    });
    setProfile(editProfile);
    setEditProfile("");
    handleEditClose();
  };

  const handleChangeInput = (value) => setEditProfile(value);

  const editDialogButtons = [
    { text: "저장", handler: handleClickSave }
  ];

  return (
    <Fragment>
      <Paper className={classes.root}>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppearTimeout={500}
        >
          {auth.loggingIn && 
            (<header className={classes.header}>
              <IconButton onClick={handleEditOpen} size="small">
                <SettingsIcon />
              </IconButton>
            </header>)}
          <div className={classes.body}>
            <MarkdownText value={profile} />
          </div>
        </ReactCSSTransitionGroup>
      </Paper>

      <DefaultDialog
        open={editOpen}
        handleClose={handleEditClose}
        title="수정"
        buttons={editDialogButtons}
      >
        <AboutEditor 
          value={editProfile} 
          onChange={handleChangeInput} 
        />
      </DefaultDialog>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authentication
  }
}

export default connect(mapStateToProps)(About);