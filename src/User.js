import React from 'react';
import PropTypes from 'prop-types';

function User({ todo }) {

  return (
    <td>{todo.user.username}</td>
  );
}

User.propTypes = {
  todo: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default User;
