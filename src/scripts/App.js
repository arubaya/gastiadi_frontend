import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Router from './route/Router';
import Cookies from 'js-cookie';

import { userLogin, userName } from './data/User';
import apiClient from './data/api';
// import Ws from '@adonisjs/websocket-client';

// const ws = Ws('ws://972228991f93.ap.ngrok.io/', {
//   path: "gastiadi-ws",
// })

// const chat = ws.subscribe(`chat`)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fc5454',
      light: '#ff8881',
      dark: '#c2152b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fc5454',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
});

function App() {
  const auth = useRecoilValue(userLogin);
  const setUserName = useSetRecoilState(userName);
  const idUser = Cookies.get('id');

  // useEffect(() => {
  //   console.log("hasemboh")
  //   ws.on('open', () => {
  //     console.log('yoh')
  //   })
  //   // ws.connect();
  //   chat.on('message', (data) => {
  //     console.log(data);
  //   })
  //   chat.on('init_messages', (data) => {
  //     console.log(data);
  //   })
  // }, [])

  if (auth) {
    apiClient.get(`/user/${idUser}`).then((res) => {
      // console.log(res.data.name);
      if (res.status === 200) {
        setUserName(res.data.name)
      }
    }).catch((res) => {
      console.log(res);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
