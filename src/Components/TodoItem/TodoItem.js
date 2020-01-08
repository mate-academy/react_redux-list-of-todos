import React from 'react';
import { TodoItemProps } from '../PropTypes/PropTypes';
import UserComponent from '../User/User';
import './TodoItemStyles.css';

const TodoItem = ({ todo, deleteTodo }) => {
  const { id, title, user } = todo;

  return (
    <div className="todo-item">
      <button
        type="button"
        onClick={deleteTodo}
        className="destroy"
      />
      <div className="title-wrapper">
        <p className="todo-item__title">{id}</p>
        <p className="todo-item__main-title">{title}</p>
      </div>
      <UserComponent user={user} />
    </div>
  );
};

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
