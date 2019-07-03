import React from 'react';

function User({ user }) {
  return (
    <a href={`mailto:${user.email}`}>{user.name}</a>
  );
};

export default User;
