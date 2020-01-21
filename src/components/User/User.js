import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div className="user-info">
      <p>
        <strong>{user.name}</strong>
      </p>
      <a href={`mailto:${user.email}`}>{user.email}</a>
      <p>{user.phone}</p>
      <a href={`${user.website}`}>{user.website}</a>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
