import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const Users = ({ name, username, email }) => (
  <div className="card-title">
    <h5>User information:</h5>
    <ul>
      <li>{name}</li>
      <li>{username}</li>
      <li>{email}</li>
    </ul>
  </div>
);

Users.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
