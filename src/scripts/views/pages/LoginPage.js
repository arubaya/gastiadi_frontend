import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookies from 'js-cookie';

import apiClient from '../../data/api';
import { userLogin, userRole, userName } from '../../data/User';
import Logo from '../../../images/logo.png';
import { data } from 'jquery';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginProgress, setLoginProgress] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errTextEmail, setErrTextEmail] = useState('');
  const [errTextPassword, setErrTextPassword] = useState('');

  const setAuth = useSetRecoilState(userLogin);
  const setRole = useSetRecoilState(userRole);
  const setUserName = useSetRecoilState(userName);

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginProgress(true);
    apiClient.post('/login', {
        email,
        password,
      }).then((res) => {
        console.log(res.data.data[0]);
        if (res.status === 200) {
          if (res.data.data[0].role_id === 3) {
            history.push('/')
          } else {
            setAuth(true);
            Cookies.set('loggedIn', true);
            Cookies.set('id', res.data.data[0].id);
            Cookies.set('role', res.data.data[0].role_id);
            Cookies.set('token', `Bearer ${res.data.token.token}`);
            setUserName(res.data.data[0].name)
            setRole(Cookies.get('role'));
            setLoginProgress(false);
            history.push('/cs/dashboard/start')
            
          }
        }
      }).catch((res) => {
        console.log(res);
        setLoginProgress(false);
      });
  };
  const checkValidate = (e, field) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (field === 'email') {
      if (e.target.value === '') {
        setErrorEmail(false);
        setErrTextEmail('');
        setEmail(e.target.value);
      } else if (e.target.value.match(mailformat)) {
        setErrorEmail(false);
        setErrTextEmail('');
        setEmail(e.target.value);
      } else {
        setErrorEmail(true);
        setErrTextEmail('Sorry, this is not a valid email');
      }
    }

    if (field === 'password') {
      if (e.target.value === '') {
        setErrorPassword(false);
        setErrTextPassword('');
        setPassword(e.target.value);
      } else if (e.target.value.length < 6) {
        setErrorPassword(true);
        setErrTextPassword('Your password must be at least 8 characters');
      } else if (e.target.value.length >= 6) {
        setErrorPassword(false);
        setErrTextPassword('');
        setPassword(e.target.value);
      }
    }
  };

  return (
      <main id="loginPage">
        <div className="login-regis-logo">
          <img src={Logo} alt="Gastiadi Logo" />
        </div>
        <div className="line" />
        <div className="login-container">
          <h3>Masuk</h3>
          <form onSubmit={submitHandler} className="login-form" noValidate autoComplete="off">
            <TextField
              id="filledEmail"
              label="Email"
              color="primary"
              type="email"
              name="email"
              error={errorEmail}
              helperText={errTextEmail}
              autoFocus
              onChange={(e) => checkValidate(e, 'email')}
            />
            <TextField
              id="filledPassword"
              label="Password"
              color="primary"
              type="password"
              name="password"
              error={errorPassword}
              helperText={errTextPassword}
              onChange={(e) => checkValidate(e, 'password')}
            />
            {loginProgress ? (
              <div className="progress-container" >
                <CircularProgress size={20} color="primary" />
              </div>
              ) : (
                <Button id="loginButton" variant="contained" color="primary" disableElevation type="submit">
                  Masuk
                </Button>
              )}
          </form>
          <p className="text-link-to">
            Belum memiliki akun?
            <NavLink className="link-to" to="/register">
              Daftar
            </NavLink>
          </p>
        </div>
      </main>
  );
}

export default LoginPage
