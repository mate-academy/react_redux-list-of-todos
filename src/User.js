import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <p className="user-name">{user.name}</p>
);

User.propTypes = { user: PropTypes.string.isRequired };

export default User;
