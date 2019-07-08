import React from 'react';
import User from './User';

export default function TodoItem(props) {
    return (
      <tr className={props.completed ? 'completed' : 'uncompleted'}>
        <td>{props.title}</td>
        <td><User user={props.user} /></td>
        <td>{props.email}</td>
        <td>{props.completed ? 'completed' : 'uncompleted'}</td>
        <td className="delete" onClick={() => props.removeTheItem(props.index)}>&times;</td>
      </tr>
    );
  }
