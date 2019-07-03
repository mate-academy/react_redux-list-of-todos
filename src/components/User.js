import React from 'react';
import './User.css';

function User(props) {
  return(
      <td className='name'><a href = {`mailto:${props.email}`}>{props.name}</a></td>
  )
}

export default User;
