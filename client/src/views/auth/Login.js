import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { authActions } from "../../actions/authActions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    zIndex: 9999
  },
  loginBox: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 350,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 5,
    outline: "none"
  },
  title: {
    fontWeight: "550",
    width: "100%",
    fontSize: 25,
    textAlign: "center",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

function Login({ dispatch }) {
  const classes = useStyles();

  const [userId, setUserId] = React.useState("");

  const [password, setPassword] = React.useState("");

  const onChangeUserId = e => setUserId(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);
  const submit = e => {
    e.preventDefault();
    dispatch(authActions.login(userId, password));
  };

  return (
    <div className={classes.root}>
      <div className={classes.loginBox}>
        <div className={classes.title}>LOGIN</div>
        <form onSubmit={submit}>
          <TextField
            id="standard-name"
            label="ID"
            fullWidth
            variant="outlined"
            margin="dense"
            autoComplete="current-username"
            value={userId}
            onChange={onChangeUserId}
            className={classes.textField}
            autoFocus={true}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            variant="outlined"
            margin="dense"
            value={password}
            onChange={onChangePassword}
            className={classes.textField}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            className={classes.button}
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
}

export default connect()(Login);
