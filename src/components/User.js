import React from 'react';

function User(props) {
  return (
    <td><a href={props.user.email}>{props.user.name}</a></td>
  );
}

export default User;
