import React from 'react';
import PropTypes from 'prop-types';
import User from '../user/User';

const TodoItem = ({ text, completed, user }) => (
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
  </tr>
);

TodoItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.object,
}.isRequired;

export default TodoItem;
