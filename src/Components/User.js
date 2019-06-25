import React from 'react';

export default function User(props) {
  const { user, email } = props;

  return (
    <React.Fragment>
      <a href={'mailto:' + email}><span className="email">&#9993;</span>
        {user}
      </a>
    </React.Fragment>
  );
}

