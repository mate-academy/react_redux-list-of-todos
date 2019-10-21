import React from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';
import User from '../User/User';

const TodoItem = ({ todo }) => (
  <div
    className={
      todo.completed ? 'ui raised link green card' : 'ui raised link red card'
    }
  >
    <div className="content">
      <User {...todo.user} />
      <div className="description">{todo.title}</div>
      {todo.completed ? (
        <i className="check circle outline green icon" />
      ) : (
        <i className="times circle outline red icon" />
      )}
    </div>
  </div>
);

export default TodoItem;

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};
