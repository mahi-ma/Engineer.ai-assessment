import React from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Posts from "../views/Posts";
import PostInfo from "../views/PostInfo"

function RootRouter() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Posts} />
      <Route exact path="/info/:post" component={PostInfo} />
    </Switch>
    </BrowserRouter>
  );
}

export default RootRouter;