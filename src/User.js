import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <>{user.name}</>
);

User.propTypes = { user: PropTypes.string.isRequired };

export default User;
