
import React from 'react';
import firebase from 'firebase/app';
import './signin.css';

function SignIn({ Auth }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    Auth.signInWithPopup(provider);
  };

  return (
    <div className="signin">
      <h1 className="heading">Chat App</h1>
      <p className="body">The easiest way to chat with people</p>
      <button className="google" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
}

export default SignIn;
