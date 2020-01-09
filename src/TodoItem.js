import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo }) => (
  <>
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <User user={todo.user} />
      <td>{todo.completed ? 'Done' : 'In progress'}</td>
    </tr>
  </>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
    completed: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;
