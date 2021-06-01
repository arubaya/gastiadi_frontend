import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { NavLink, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userLogin, userName, userRole } from '../../data/User';
import apiClient from '../../data/api';
import Logo from '../../../images/logo.png';

function RegisterUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errTextEmail, setErrTextEmail] = useState('');
  const [errTextPassword, setErrTextPassword] = useState('');
  const [errTextConfirmPassword, setErrTextConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [loginProgress, setLoginProgress] = useState(false);

  const setUserName = useSetRecoilState(userName);
  const setRole = useSetRecoilState(userRole);
  const setAuth = useSetRecoilState(userLogin);
  const history = useHistory();

  const redirectToDashboard = () => {
    setOpen(false);
    history.push('/');
  };

  useEffect(() => {
    apiClient.get('/regions')
    .then((res) => {
      // console.log(res.data.result)
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginProgress(true);

    apiClient.post('/adduser', {
      name,
      email,
      password,
    }).then((res) => {
      // console.log(res.data);
      if (res.status === 201) {
        setAuth(true);
        Cookies.set('loggedIn', true);
        Cookies.set('id', res.data.data.id);
        Cookies.set('role', res.data.data.role_id);
        setUserName(res.data.data.name)
        setRole(Cookies.get('role'));
        setLoginProgress(false);
        setOpen(true);
      }
    }).catch((res) => {
      setLoginProgress(false);
      console.log(res);
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

    if (field === 'confirm password') {
      if (e.target.value === '') {
        setErrorConfirmPassword(false);
        setErrTextConfirmPassword('');
        // setConfirmPassword(e.target.value);
      } else if (e.target.value !== password) {
        setErrorConfirmPassword(true);
        setErrTextConfirmPassword('Your password not same');
      } else {
        setErrorConfirmPassword(false);
        setErrTextConfirmPassword('');
        // setConfirmPassword(e.target.value);
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
          <h3>Daftar</h3>
          <form onSubmit={submitHandler} className="login-form" noValidate autoComplete="off">
            <TextField
              autoFocus
              id="filledName"
              label="Nama"
              color="primary"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="filledEmail"
              label="Email"
              color="primary"
              type="email"
              name="email"
              error={errorEmail}
              helperText={errTextEmail}
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
            <TextField
              id="filledConfirmPassword"
              label="Konfirmasi Password"
              color="primary"
              type="password"
              name="password"
              error={errorConfirmPassword}
              helperText={errTextConfirmPassword}
              onChange={(e) => checkValidate(e, 'confirm password')}
            />
            {loginProgress ? (
              <div className="progress-container" >
                <CircularProgress size={20} color="primary" />
              </div>
              ) : (
                <Button id="loginButton" variant="contained" color="primary" disableElevation type="submit">
                  Daftar
                </Button>
              )}
          </form>
          <p className="text-link-to">
            Sudah memiliki akun?
            <NavLink className="link-to" to="/login">
              Masuk
            </NavLink>
          </p>
          <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Akun anda berhasil dibuat</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Selamat datang di Gastiadi. Silahkan melanjutkan ke halaman dashboard customer service
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={redirectToDashboard} color="primary" autoFocus>
                Dashboard
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
  );
}

export default RegisterUserPage
