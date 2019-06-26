import React from 'react';
import { Link } from 'react-router-dom';

function User({ user }) {
const { username, id} = user;
  return (
    <div className="user">
      <Link to={`user/${id}`}>{username}</Link>
    </div>
  );
}

export default User;
