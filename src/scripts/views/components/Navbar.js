import { Button } from '@material-ui/core';
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userName, userLogin } from '../../data/User';

import Logo from '../../../images/logo.png';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import Ws from '@adonisjs/websocket-client';

// const ws = Ws('ws://192.168.1.12:8080/', {
//   path: "gastiadi-ws",
// })
// const chat = ws.subscribe(`chat`)

function Navbar() {
  const name = useRecoilValue(userName)
  const setAuth = useSetRecoilState(userLogin);
  const history = useHistory();

  const logoutHandler = () => {
    setAuth(false);
    Cookies.set('loggedIn', false);
    Cookies.remove('id');
    Cookies.remove('role');
    Cookies.remove('token');
    history.push('/');
  } 

  return (
    <header id="header">
      <div className="navbar-title-container">
        <div className="image-container">
          <img src={Logo} alt="Gastiadi" />
        </div>
        <h4>Customer Service Dashboard</h4>
      </div>
      <nav id="navbar">
        <div className="profile-navbar">
          <p>Hai, <span className="name-bold">{name}</span></p>
        </div>
        <Button
        className="button-logout"
        variant="outlined"
        size="small" 
        disableElevation 
        onClick={() => logoutHandler()}
        color="primary">
          Keluar
        </Button>
      </nav>

    </header>
  )
}

export default Navbar
