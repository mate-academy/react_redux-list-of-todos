import React from 'react';
import User from './User';

function TodoItem(props) {
  const { todo } = props;
  return (
    <tr>
      <td>{todo.title}</td>
      <td><User user={todo.user} /></td>
      <td>{`${todo.completed}`}</td>
    </tr>
  );
};

export default TodoItem;
