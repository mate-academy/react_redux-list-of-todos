import React from 'react';
import User from './User';
import './TodoItem.css';

function TodoItem(props) {
  const { id, title, email, completed, author, removeItem } = props;
  return (
    <tr key = {id}>
      <td className='id'>{id}</td>
      <td className='title'>{title}</td>
      <User name={author} email={email} />
      <td><input type="checkbox" defaultChecked={completed} />
      <button className='remove' onClick={() => removeItem(id)}>remove</button></td>
    </tr>
  );
}

export default TodoItem;
