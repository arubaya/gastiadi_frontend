import { Button } from '@material-ui/core';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { userName } from '../../data/User';

import Logo from '../../../images/logo.png';

function Navbar() {
  const name = useRecoilValue(userName)

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
        color="primary">
          Keluar
        </Button>
      </nav>

    </header>
  )
}

export default Navbar
