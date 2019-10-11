import React from 'react';
import PropTypes from 'prop-types';
import './User';

function User({ user }) {
  return (
    <div>
      <p>
        Responsible:
        <span>
          {user.name}
        </span>
      </p>
      <p>
        Contact:
        <span>
          {user.email}
        </span>
      </p>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
