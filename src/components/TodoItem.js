import React from 'react';
import PropTypes from 'prop-types';
import { TodoUser } from './TodoUser';

export function TodoItem(props) {
  const {
    completed,
    title,
    index,
    removeTodoItem,
    user,
  } = props;

  const {
    name,
    username,
    email,
    phone,
    website,
  } = user;

  return (
    <tr>
      <td>
        <h5>{title}</h5>
      </td>
      <td>
        <span>{completed ? 'Yes' : 'No'}</span>
        <input type="button" onClick={() => removeTodoItem(index)} value="Remove Todo" />
      </td>
      <td>
        <TodoUser nameText={name} username={username} email={email} phone={phone} website={website} />
      </td>
    </tr>
  );
}

TodoItem.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  removeTodoItem: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};
