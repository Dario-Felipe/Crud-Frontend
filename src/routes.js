import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main/index';
import UserDetails from './pages/UserDetails/index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path = "/index" component = { Main }></Route>
      <Route path = "/index/:id" component = { UserDetails }></Route>
    </Switch>
  </BrowserRouter>
)
export default Routes;