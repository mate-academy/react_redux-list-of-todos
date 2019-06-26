import React from 'react';

function UserInfo({user}) {
  const {name, email, username, phone, website} = user;
  return (
    <div>
      <ul>
        <li><span>Username:</span>{name}</li>
        <li><span>Name:</span>{email}</li>
        <li><span>Phone:</span>{username}</li>
        <li><span>Email:</span>{phone}</li>
        <li><span>Website:</span>{website}</li>
      </ul>
    </div>
  );
}

export default UserInfo;
