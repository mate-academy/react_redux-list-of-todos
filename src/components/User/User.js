import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({ name, username, email }) => {
  const userName = name.split(' ');
  const userFirstName = userName.splice(0, 1);

  return (
    <div className="user">
      <p className="user__title">{userFirstName}</p>
      <p className="user__title user--nik">{`'${username}'`}</p>
      <p className="user__title">{userName.join(' ')}</p>
      <p className="user__title user--email">{email}</p>
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
export default User;
