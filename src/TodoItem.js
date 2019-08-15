import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todoData, handleTodoDelete }) => (
  <div className="todoitem">
    <ul> <b>Name: </b>
      <li className="user_user-name">
        {todoData.user.name}
      </li>
   </ul>
   <ul>
    <b>Title: </b>
      <li className="todoitem_title">
        {todoData.title}
      </li>
    </ul>
    <ul>
      <b>Status: </b>
      {!todoData.completed
      ? <li className="progress">
          IN PROGRESS...
          <button className="delete" onClick={() => handleTodoDelete(todoData.id)}>x</button>
        </li>
      : <li className="done">
          DONE!
          <button className="delete" onClick={() => handleTodoDelete(todoData.id)}>x</button>
        </li>}
    </ul>
  </div>
);

TodoItem.propTypes = {
  todoData: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;
