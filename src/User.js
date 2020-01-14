import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name, email }) => (
  <>
    <td className="table__cell">{name}</td>
    <td className="table__cell">{email}</td>
  </>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default User;
