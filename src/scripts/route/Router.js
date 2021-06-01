import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Authenticated from '../middleware/Authenticated';
import CsRoute from '../middleware/CsRoute';
// import AdminRoute from '../middleware/AdminRoute';
import Navbar from '../views/components/Navbar';
import HomePage from '../views/pages/HomePage';
import LoginPage from '../views/pages/LoginPage';
import RegisterPage from '../views/pages/RegisterPage';
import RegisterUserPage from '../views/pages/RegisterUserPage';
import CsDashboardPage from '../views/pages/CsDashboardPage';
import UserDashboardPage from '../views/pages/UserDashboardPage';
import UserRoute from '../middleware/UserRoute';

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
      <Route exact path="/register/user">
        <Authenticated>
          <RegisterUserPage />
        </Authenticated>
      </Route>
      <Route exact path="/cs/dashboard/:roomid">
        <CsRoute>
          <Navbar />
          <CsDashboardPage />
        </CsRoute>
      </Route>
      <Route exact path="/user/dashboard/:roomid">
        <UserRoute>
          <Navbar />
          <UserDashboardPage />
        </UserRoute>
      </Route>
      <Route exact path="*">
        <Redirect from="*" to="/" />
      </Route>
    </Switch>
  )
}

export default Router
