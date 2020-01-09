import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <td>{user.name}</td>
);

User.propTypes = { user: PropTypes.objectOf(PropTypes.any).isRequired };

export default User;
