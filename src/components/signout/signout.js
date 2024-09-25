
import React from 'react';
import './signout.css';

function SignOut({ Auth }) {
  return (
    Auth.currentUser && (
      <div className="signoutd">
        <button className="signout" onClick={() => Auth.signOut()}>
          Sign Out
        </button>
      </div>
    )
  );
}

export default SignOut;
