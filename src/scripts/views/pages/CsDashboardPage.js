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

const ws = Ws('ws://192.168.1.12:8080/', {
  path: "gastiadi-ws",
})

const chat = ws.subscribe(`chat`)

function CsDashboardPage() {
  const {roomid} = useParams();
  const [noChatActive, setNoChatActive] = useState(false);
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [receiverName, setReceiverName] = useState('')
  const [message, setMessage] = useState('')
  const userID = Cookies.get('id');
  const name = useRecoilValue(userName);

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
    ws.connect();
    chat.emit('init_chat', {id: userID})
    chat.on('messages', (data) => {
      console.log(data);
      setMessages(data)
      scrollToBottom()
    })
    chat.on('init_chat', (data) => {
      setChats(data)
    })
    chat.on('init_messages', (data) => {
      console.log(data);
      setMessages(data)
      scrollToBottom()
    })
    
  }, [])

  const openChat = (id, name) => {
    setReceiverName(name);
    history.push(`/cs/dashboard/${id}`);
    chat.emit('join_room', {room_id: id})
    scrollToBottom()
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
            <h4>Customer Service Chat</h4>
          </div>
          <List id="chatList">
            {chats.map((data) => (
              <ListItem key={data.id} className="chats" button onClick={() => openChat(data.id, data.name)}>
                <div className="avatar-container">
                  <Avatar style={greyColor}></Avatar>
                </div>
                <div className="text-container">
                  <p className="name">{data.name}</p>
                  <p className="chat-status">{data.status}</p>
                </div>
                <div className="chat-line" />
              </ListItem>
            ))}
          </List>

        </section>
        {noChatActive? (
          <section id="noChatActiveContainer">
            <p>Anda belum memulai percakapan. Silahkan klik salah satu pesan di samping.</p>
            <div style={{ float:"left", clear: "both" }}
              ref={ref}>
            </div>
          </section>
        ) : (
          <section id="chatRoomContainer">
            <div className="chat-title-container">
              <div className="chat-title-name">
                <Avatar style={greyColor}></Avatar>
                <p className="user-name">{receiverName}</p>
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

export default CsDashboardPage
