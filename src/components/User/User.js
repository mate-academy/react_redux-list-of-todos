import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({ user }) => {
  const {
    username, name, phone, website, email,
  } = user;

  return (
    <div className="user">
      <p className="user__username">
        {username}
      </p>
      <p className="user__name">
        {name}
      </p>
      <p className="user__email">
        {email}
      </p>
      <p className="user__phone">
        {phone}
      </p>
      <p className="user__website">
        {website}
      </p>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default User;
