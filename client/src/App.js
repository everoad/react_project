import React, { Fragment, useEffect, useState } from "react";
import Home from "./views/Home";
import { history } from "./utils/history";
import { authRoutes } from "./routes";
import { authActions } from "./actions/authActions";
import { dataActions } from "./actions/dataActions";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#7453a6" }
  }
});

function App({ dispatch }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializing = async () => {
      await dispatch(await dataActions.getDefaultData());
      await dispatch(await authActions.autoLogin());
      setLoading(false);
    };

    initializing();
  }, [dispatch]);

  return (
    <Fragment>
      {loading && <div>Loding..</div>}
      {!loading && (
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router history={history}>
              <Route path={"/"} component={Home} />
              {authRoutes.map((route, key) => (
                <Route key={key} {...route} />
              ))}
            </Router>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </Fragment>
  );
}

export default connect()(App);
