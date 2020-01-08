import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userData }) => (
  <td>{userData.name}</td>
);

User.propTypes = { userData: PropTypes.shape({
  name: PropTypes.string,
}).isRequired };

export default User;
