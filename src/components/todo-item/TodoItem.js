import React from 'react';
import PropTypes from 'prop-types';
import User from '../user/User';

const TodoItem = ({
  id, text, completed, user, removeTodo,
}) => (
  <tr
    className="item"
  >
    <td>
      <label
        className="label d-flex justify-content-center align-items-center"
        htmlFor="checkbox"
      >
        <input
          type="checkbox"
          id="checkbox"
          checked={completed}
          readOnly
        />
      </label>
    </td>
    <td>
      <span className="label">{text}</span>
    </td>
    <td>
      <User
        key={user.id}
        name={user.name}
      />
    </td>
    <td className="d-flex justify-content-center align-items-center">
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => removeTodo(id)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </td>
  </tr>
);

TodoItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.object,
  removeTodo: PropTypes.func,
}.isRequired;

export default TodoItem;
