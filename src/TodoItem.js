import React from 'react';
import PropsTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>{todo.completed ? 'Yep' : 'Nope'}</td>
    <td>{todo.userName}</td>
  </>
);

TodoItem.propTypes = {
  todo: PropsTypes.objectOf(PropsTypes.shape({
    id: PropsTypes.number.isRequired,
    title: PropsTypes.string.isRequired,
    completed: PropsTypes.bool.isRequired,
    useName: PropsTypes.string.isRequired,
  })).isRequired,
};

export default TodoItem;
