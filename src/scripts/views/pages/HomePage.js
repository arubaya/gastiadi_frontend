import React from 'react'
// import '../../../styles/homePage.css'
import Logo from '../../../images/logo.png';
import Illustration from '../../../images/home-illustration-mirror.png';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

function HomePage() {
  const style = {
    backgroundImage: `url(${Illustration})`,
    backgroundSize: '500px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom',
  }
  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login")
  }

  return (
    <main id="homePage" style={style}>
      <div className="page-container">
        <div className="home-image-container">
          <img src={Logo} alt="Gastiadi Logo" />
        </div>
        <div className="home-text-container">
          <h6>Selamat datang di website Gastiadi untuk <span className="cs-highlight">Customer Service</span></h6>
        </div>
        <Button 
        id="loginButton" 
        variant="outlined" 
        color="primary" 
        disableElevation 
        onClick={() => redirectToLogin()} 
        style={{width: '300px'}}>
          Log in
        </Button>
      </div>
    </main>
  )
}

export default HomePage
