import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Layout from "../ui/layouts/Layout";
import { publicRoutes, privateRoutes } from "../routes";

const login = true;

function Home() {
  return (
    <Layout>
      <Switch>
        {privateRoutes.map((route, key) => {
          return login ? (
            <Route {...route} key={key} />
          ) : (
            <Redirect to="/login" />
          );
        })}
        {publicRoutes.map((route, key) => {
          return <Route {...route} key={key} />;
        })}
      </Switch>
    </Layout>
  );
}

export default Home;
