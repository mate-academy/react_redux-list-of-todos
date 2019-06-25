import React from 'react';
import User from './User';

export default function TodoItem(props) {
  const { title,
          user,
          email,
          status,
          index,
          removeTodo } = props;

  return (
    <tr>
      <td>{title}</td>
      <td><User user={user} email={email} /></td>
      <td>{status}</td>
      <td onClick={() => removeTodo(index)}>&times;</td>
    </tr>
  )
}
