import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Layout from "../ui/layouts/Layout";
import { publicRoutes, privateRoutes } from "../routes";


function Home() {
  return (
    <Layout>
      <Switch>
        {privateRoutes.map((route, key) => <Route {...route} key={key} />)}
        {publicRoutes.map((route, key) => {
          return <Route {...route} key={key} />;
        })}
      </Switch>
    </Layout>
  );
}

export default Home;
