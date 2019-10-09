import React from 'react';
import './Todo.scss';
import User from '../User/User';
// import { TodoProps } from '../../constants/PropTypes';

const TodoItem = ({ todo, deleteTodoFromList }) => {
  const {
    key, title, completed, user,
  } = todo;
  return (
    <div className="todo-item" key={key}>
      <div className="todo-item__title-block">
        <h2 className="todo-item__title">{title}</h2>
        <button
          type="button"
          onClick={deleteTodoFromList}
          className="todo-item__delete"
        >
          X
        </button>
      </div>

      <p className="todo-item__check">{completed ? '\u2705' : '\u274c'}</p>
      <User {...user} completed={completed} />
    </div>
  );
};

export default TodoItem;
