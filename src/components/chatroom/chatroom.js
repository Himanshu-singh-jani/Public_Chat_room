
import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './chatroom.css';

function ChatRoom({ Auth }) {
  const firestore = firebase.firestore();
  const [formValue, setFormValue] = useState('');
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const sendMessage = async (e) => {
    e.preventDefault();
    const { displayName, uid, photoURL } = Auth.currentUser;

    await messagesRef.add({
      user: displayName,
      body: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  const ChatMessage = ({ message }) => {
    const { user, body, photoURL } = message;
    return (
      <div className="user">
        <img className="profilepic" src={photoURL} alt={`${user}'s profile`} />
        <div>
          <p className="username">{user}:</p>
          <p className="message">{body}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="main">
      <div>
        <div className="patel">Chat App</div>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </div>
      <form className="form" onSubmit={sendMessage}>
        <input
          className="type"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something"
        />
        <button className="send" type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
