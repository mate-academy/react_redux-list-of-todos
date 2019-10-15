import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({ user }) => {
  const {
    username, email, name, phone, website,
  } = user;

  return (
    <div className="user">
      <p className="user__name">{name}</p>
      <p className="user__username">{username}</p>
      <div className="user__details">
        <span className="user__phone">{phone}</span>
        <a href=":mail" className="user__email">{email}</a>
        <a href="#1" className="user__website">{website}</a>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};

export default User;
