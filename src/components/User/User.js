import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

const User = ({ name,email }) => (
  <>
    <div className="header">{name}</div>
    <div className="item meta">
      <i className="mail icon" />
      <a href={`mailto:${email}`} className="content">{email}</a>
    </div>
  </>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
