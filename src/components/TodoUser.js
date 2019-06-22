import React from 'react';
import PropTypes from 'prop-types';

export function TodoUser(props) {
  const {
    nameText,
    username,
    email,
    website,
    phone,
  } = props;

  return (
    <section>
      <h3>{nameText}</h3>
      <h5>{username}</h5>
      <p>{email}</p>
      <span>{website}</span>
      <span>{phone}</span>
    </section>
  );
}

TodoUser.propTypes = {
  nameText: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
