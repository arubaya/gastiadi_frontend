import React, { useEffect, useState } from 'react'
import TelegramIcon from '@material-ui/icons/Telegram';
import SendIcon from '@material-ui/icons/Send';
import { Avatar, Button, IconButton, List, ListItem, TextField } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
// import { userName } from '../../data/User';

function CsDashboardPage() {
  const {roomid} = useParams();
  const [noChatActive, setNoChatActive] = useState(false);

  useEffect(() => {
    if(roomid === "start") {
      setNoChatActive(true);
    } else {
      setNoChatActive(false);
    }
  }, [roomid])

  const greenColor = {
    color: '#fff',
    backgroundColor: green[400],
    fontSize: '18px',
    width: '35px',
    height: '35px'
  }

  const greyColor = {
    color: '#fff',
    backgroundColor: grey[400],
    fontSize: '18px',
    width: '35px',
    height: '35px'
  }
  return (
    <main id="csDashboardPage">
      <div className="chat-container">
        <section id="chatListContainer">
          <div className="chat-list-title">
            <TelegramIcon />
            <h4>Customer Service Chat</h4>
          </div>
          <List id="chatList">
            <ListItem className="chats" button>
              <div className="avatar-container">
                <Avatar style={greenColor}>J</Avatar>
              </div>
              <div className="text-container">
                <p className="name">Joko</p>
                <p className="chat-status">active</p>
              </div>
              <div className="chat-line" />
            </ListItem>

            <ListItem className="chats" button>
              <div className="avatar-container">
                <Avatar style={greyColor}>TA</Avatar>
              </div>
              <div className="text-container">
                <p className="name">Tsabit Arubaya</p>
                <p className="chat-status pending">pending</p>
              </div>
              <div className="chat-line" />
            </ListItem>                      
          </List>

        </section>
        {noChatActive? (
          <section id="noChatActiveContainer">
            <p>Anda belum memulai percakapan. Silahkan klik salah satu pesan di samping.</p>
          </section>
        ) : (
          <section id="chatRoomContainer">
            <div className="chat-title-container">
              <div className="chat-title-name">
                <Avatar style={greenColor}>J</Avatar>
                <p className="user-name">Joko</p>
              </div>
              <Button
              color="primary"
              disableElevation
              style={{marginRight: '20px'}}
              >
                Selesai
              </Button>
            </div>
            <div className="chat-content-container">
              <div className='message-container receiver'>
                  <p className='message-name receiver'>
                      Tsabit Arubaya
                  </p>
                  <div className='message receiver'>
                      Ada yang bisa saya bantu?
                      <p className="timestamp receiver">
                        20.22, 23 Mei 2021
                      </p>
                  </div>
              </div>

              <div className='message-container'>
                  <p className='message-name'>
                    Joko
                  </p>
                  <div className='message'>
                      Gak ada sih hehe
                      <p className="timestamp">
                        20.23, 23 Mei 2021
                      </p>
                  </div>
              </div>

            </div>
            <form className="chat-send-message-container">
              <TextField
                  className="input-message-container"
                  id="chatMessageInput"
                  label="Ketikkan pesan..."
                  multiline
                  rowsMax={3}
                  color="primary"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              <IconButton type="submit" aria-label="send" color="primary" className="button-send-message">
                <SendIcon />
              </IconButton>
            </form>
          </section>
        )}
      </div>
    </main>
  )
}

export default CsDashboardPage
