import React from 'react';

function User({ user }) {
  return (
    <div className="user-info">
      <p>
        <strong>{user.name}</strong>
      </p>
      <a href={'mailto:${user.email}'}>{user.email}</a>
      <p>{user.phone}</p>
      <a href={'${user.website}'}>{user.website}</a>
    </div>
  );
}

export default User;
