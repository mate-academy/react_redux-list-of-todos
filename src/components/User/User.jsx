import React from 'react';
import './User.scss';

function User({
  name, username, email, completed,
}) {
  return (
    <div className={`user-item${completed ? ' green' : ' red'}`}>
      <p className="user-item__name">{name}</p>
      <h2 className="user-item__username">{username}</h2>
      <p className="user-item__mail">{email}</p>
    </div>
  );
}

export default User;
