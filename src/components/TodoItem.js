import React from 'react';
import User from './User';

function TodoItem(props) {
  let key = 0;
  key++;
  return(
    <tr key = {key}>
      <td>{props.id}</td>
      <td>{props.title}</td>
      <User name = {props.author} email = {props.email}/>
      <td>{props.completed}
        <button onClick={() => props.removeItem(props.id)}>remove</button>
      </td>
    </tr>
  )
}

export default TodoItem;
