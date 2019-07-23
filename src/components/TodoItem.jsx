import React from 'react';
import User from './User';

export default function TodoItem(props) {
  const {
    title,
    user,
    email,
    status,
    index,
    removeItem,
  } = props;

  return (
    <tr>
      <td>{title}</td>
      <td><User user={user} email={email} /></td>
      <td className={props.todo.completed ? 'completed' : 'not-completed'}>{status}</td>
      <td onClick={() => removeItem(index)} className="remove-item">&times;</td>
    </tr>
  );
}
