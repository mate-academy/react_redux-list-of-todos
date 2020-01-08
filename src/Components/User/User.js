import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({ name, username, email }) => (
  <div className="user">
    <h1 className="user__name user__text">{name}</h1>
    <p className="user__username user__text">{username}</p>
    <p className="user__email user__text">{email}</p>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default User;
