import React from 'react';
import User from './User';
import './TodoItem.css';

function TodoItem(props) {
  return (
    <tr key = {props.id}>
      <td className='id'>{props.id}</td>
      <td className='title'>{props.title}</td>
      <User name={props.author} email={props.email} />
      <td><input type="checkbox" defaultChecked={props.completed} />
      <button className='remove' onClick={() => props.removeItem(props.id)}>remove</button></td>
    </tr>
  );
}

export default TodoItem;
