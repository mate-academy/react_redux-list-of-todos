import React from 'react';

export default function User(props) {
  const { user, email } = props;

  return (
    <a href={`mailto:${email}`}>
      <span className="email">&#9993;</span>
      {user}
    </a>
  );
}
