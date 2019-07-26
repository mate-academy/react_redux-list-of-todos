import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem({ todo }) {
  return (
    <tr>
      <td>{todo.todo.id}</td>
      <td>{todo.todo.title}</td>
      <User todo={todo} />
      <td className="table-noborder">
        <button type="button" className="table--button">Remove</button>
      </td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TodoItem;
