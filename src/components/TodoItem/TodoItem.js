import React from 'react';

import './TodoItem.css';
import User from '../User/User';

const TodoItem = ({ todo, deleteTodos }) => {
  const { id, title, user,  } = todo;

  return (
    <div className="ui card todo-item">
      <div className="content">
        <button onClick={deleteTodos} type="button">Delete</button>
        <span className="header todo-item__id">{id}</span>
        <h2 className="header todo-item__title">{title}</h2>
        <User user={user} />
      </div>
    </div>
  );
};

export default TodoItem;
