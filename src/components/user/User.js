import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <td><a href={`mailto:${user.email}`}>{user.name}</a></td>
);

export default User;

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};
