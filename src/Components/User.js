import React from 'react';

function User(props) {
  return (
    <div className='user'>
      <a href={"mailto:" + props.user.email}> {props.user.name} </a>
    </div>
  );
}

export default User;
