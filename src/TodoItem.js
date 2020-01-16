import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import './index.css';

const TodoItem = ({ todo }) => (
  <>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td><User user={todo.user} /></td>
    <td>{todo.completed ? 'completed' : 'not completed'}</td>
  </>
);

TodoItem.propTypes = { todo: PropTypes.string.isRequired };

export default TodoItem;
