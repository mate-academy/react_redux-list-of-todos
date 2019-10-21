import React from 'react';
import './ToDoItem.css';
import PropTypes from 'prop-types';
import User from '../User/User';

const ToDoItem = ({ todo }) => (
  <div className={todo.completed ? 'todoitem completed' : 'todoitem'}>
    <ul className="todoitem-list">
      <li className="todoitem-list__item-title item">{todo.title}</li>
      <li className="todoitem-list__item-status item">
        {todo.completed ? '\u2714' : '\u2718'}
      </li>
      <li className="todoitem-list__item-id item">{todo.id}</li>
    </ul>
    <User user={todo.user} />
  </div>
);

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
};

export default ToDoItem;
