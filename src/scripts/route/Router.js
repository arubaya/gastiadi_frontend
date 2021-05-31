import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Authenticated from '../middleware/Authenticated';
import CsRoute from '../middleware/CsRoute';
import AdminRoute from '../middleware/AdminRoute';
import Navbar from '../views/components/Navbar';
import HomePage from '../views/pages/HomePage';
import LoginPage from '../views/pages/LoginPage';
import RegisterPage from '../views/pages/RegisterPage';
import CsDashboardPage from '../views/pages/CsDashboardPage';

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Authenticated>
          <HomePage />
        </Authenticated>
      </Route>
      <Route exact path="/login">
        <Authenticated>
          <LoginPage />
        </Authenticated>
      </Route>
      <Route exact path="/register">
        <Authenticated>
          <RegisterPage />
        </Authenticated>
      </Route>
      <Route exact path="/cs/dashboard/:roomid">
        {/* <CsRoute> */}
          <Navbar />
          <CsDashboardPage />
        {/* </CsRoute> */}
      </Route>
      <Route exact path="*">
        <Redirect from="*" to="/" />
      </Route>
    </Switch>
  )
}

export default Router
