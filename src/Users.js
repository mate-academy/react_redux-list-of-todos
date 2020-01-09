import React from 'react';
import PropTypes from 'prop-types';

const Users = ({ user }) => (
  <>
    {user.username}
  </>
);

Users.propTypes = { user: PropTypes.string.isRequired };
export default Users;
