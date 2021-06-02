import React, { useEffect, useRef, useState } from 'react'
import TelegramIcon from '@material-ui/icons/Telegram';
import SendIcon from '@material-ui/icons/Send';
import { Avatar, Button, IconButton, List, ListItem, TextField } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useHistory, useParams } from 'react-router';
import Ws from '@adonisjs/websocket-client';
import { useRecoilValue } from 'recoil';
import { userName } from '../../data/User';
import Cookies from 'js-cookie';
import { Autocomplete } from '@material-ui/lab';
import apiClient from '../../data/api';

const ws = Ws('ws://192.168.1.12:8080/', {
  path: "gastiadi-ws",
})

const chat = ws.subscribe(`chat`)

function UserDashboardPage() {
  const {roomid} = useParams();
  const [noChatActive, setNoChatActive] = useState(false);
  const [receiverName, setReceiverName] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const userID = Cookies.get('id');
  const name = useRecoilValue(userName);

  const [cs_region_id, setCsRegionId] = useState(0);
  const [regionList, setRegionList] = useState(['none']);

  const history = useHistory();
  const ref = useRef()

  const getTimestamp = (time) => {
    const res = time.substr(0, 16)
    return res;
  }

  useEffect(() => {
    if(roomid === "start") {
      setNoChatActive(true);
    } else {
      setNoChatActive(false);
    }
  }, [roomid])

  useEffect(() => {
    apiClient.get('/regions')
    .then((res) => {
      // console.log(res.data.result)
      setRegionList(res.data.result)
    }).catch((error) => {
      console.log(error);
    });
  }, [])


  useEffect(() => {
    ws.connect();
    apiClient.post('checkroom', {
      user_id: userID,
    }).then((res) => {
      console.log(res.data)
      if (res.data.data.length > 0) {
        setReceiverName(res.data.data[0].name);
        history.push(`/user/dashboard/${res.data.data[0].id}`);
        chat.emit('join_room', {room_id: res.data.data[0].id})
      }
    }).catch((error) => {
      console.log(error)
    })
    chat.on('messages', (data) => {
      console.log(data);
      setMessages(data)
      scrollToBottom()
    })
    chat.on('init_messages', (data) => {
      console.log(data);
      setMessages(data)
      scrollToBottom()
    })
    
  }, [])

  const createChat = () => {
    apiClient.post('addroom', {
      location_id: cs_region_id,
      user_id: userID
    }).then((res) => {
      let roomId;
      let cs_id;
      if (res.data.data.length === 1){
        roomId = res.data.data[0].id;
        cs_id = res.data.data[0].cs_id;
      } else {
        roomId =  res.data.data.id;
        cs_id = res.data.data.cs_id;
      }
      chat.emit('init_chat', {id: cs_id})
      chat.emit('join_room', {room_id: roomId})
      history.push(`/cs/dashboard/${roomId}`);
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const input = document.getElementById('chatMessageInput')
    input.value = null;
    setMessage('')
    chat.emit('send_message', {
      room_id: roomid,
      name,
      user_id: userID,
      message,
    })
  }

  const scrollToBottom = () => {
    ref.current.scrollIntoView({ block: 'end' })
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
            <h4>User Chat</h4>
          </div>
          <div id="createChat">
            {noChatActive ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}>
                <p>Silahkan masukkan lokasi anda: </p>
                <Autocomplete
                  id="filledRegion"
                  style={{width: '80%'}}
                  options={regionList}
                  getOptionLabel={(region) => region.name}
                  onChange={(e, value, r) => setCsRegionId(value.id)}
                  renderInput={(params) => 
                  <TextField {...params} 
                  label="Kabupaten/Kota"
                  variant="outlined" 
                  />}
                />
                <Button id="loginButton" 
                variant="contained" 
                color="primary" 
                disableElevation
                onClick={() => createChat()}
                >
                  Buat pesan
                </Button>
              </div>
            ) : (<div></div>)}
          </div>

        </section>
        {noChatActive? (
          <section id="noChatActiveContainer">
            <p>Anda belum memulai percakapan. Silahkan pilih lokasi di samping, lalu klik buat pesan</p>
            <div style={{ float:"left", clear: "both" }}
              ref={ref}>
            </div>
          </section>
        ) : (
          <section id="chatRoomContainer">
            <div className="chat-title-container">
              <div className="chat-title-name">
                <Avatar style={greyColor}></Avatar>
                <p className="user-name">Cs: {receiverName}</p>
              </div>
            </div>
            <div className="chat-content-container">
              {messages.map((data, index) => (
                <div key={index} className={`message-container ${data.user_id === userID ? "sender" : ""}`}>
                    <p className={`message-name ${data.user_id === userID ? "sender" : ""}`}>
                        {data.name}
                    </p>
                    <div className={`message ${data.user_id === userID ? "sender" : ""}`}>
                        {data.message}
                        <p className={`timestamp ${data.user_id === userID ? "sender" : ""}`}>
                          {getTimestamp(data.created_at)}
                        </p>
                    </div>
                </div>
              ))}
              <div style={{ float:"left", clear: "both" }}
                ref={ref}>
              </div>
            </div>
            <form className="chat-send-message-container" onSubmit={sendMessage}>
              <TextField
                  className="input-message-container"
                  id="chatMessageInput"
                  label="Ketikkan pesan..."
                  multiline
                  rowsMax={3}
                  color="primary"
                  fullWidth
                  onChange={(e) => setMessage(e.target.value)}
                  size="small"
                  autoFocus
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

export default UserDashboardPage
