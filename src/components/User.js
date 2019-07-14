import React from 'react';

export default function User(props) {
  return (
    <React.Fragment>
      <a href={'mailto:' + props.email} title="click to mail">{props.user}</a>
    </React.Fragment>
  );
}
