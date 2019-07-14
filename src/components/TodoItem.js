import React from 'react';
import User from './User';

function TodoItem(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <td><User user={props.user} email={props.email} /></td>
      <td className={props.status === 'Completed' ? 'completed' : 'inProces'}>{props.status} <span className="cross" title="click to remove" onClick={() => props.remove(props.index, props.todos)}>&times;</span></td>
    </tr>
  );
}

export default TodoItem;
