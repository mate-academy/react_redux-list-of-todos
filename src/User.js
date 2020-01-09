import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const User = ({ user }) => {
  const { name, email, website } = user;

  return (
    <>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{email}</Card.Meta>
      <Card.Meta>{website}</Card.Meta>
    </>
  );
};

export default User;

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};
