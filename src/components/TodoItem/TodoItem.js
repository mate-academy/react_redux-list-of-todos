import React from 'react';
import User from '../User/User';
import './TodoItem.css';
import { TodoItemPropTypes } from '../../constants/proptypes';

const TodoItem = ({ todo, deleteTodo }) => (
  <li className="todo-item">
    <div className={todo.completed ? 'info completed' : 'info'}>
      <div className="drawing-pin">
        <img
          className="drawing-pin__img"
          alt="drawing-pin"
          src="./images/Drawing-Pin.png"
        />
      </div>
      <h1 className="item-title">
        {todo.title}
      </h1>
      <div className="item-user">
        <User user={todo.user} />
      </div>
    </div>
    <button
      type="button"
      className="btn-delete-todo"
      onClick={deleteTodo}
    >
      Delete
    </button>
  </li>
);

TodoItem.propTypes = TodoItemPropTypes;

export default TodoItem;
