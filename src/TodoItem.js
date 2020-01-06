import PropTypes from 'prop-types';
import React from 'react';
import User from './User';

const TodoItem = ({ todoItem, handleRemove, head }) => {
  const { user, id, completed } = todoItem;
  const tableHead = [...head].filter(field => field !== 'email');
  const done = completed ? 'done' : 'not done';

  return (
    <tr className="table__row">
      {tableHead.map((field) => {
        switch (field) {
          case 'name':
            return (
              <User name={user.name} email={user.email} key={field} />
            );

          case 'remove item':
            return (
              <td
                className="table__cell table__cell_remove"
                key={field}
              >
                <button
                  type="button"
                  className="button_remove"
                  onClick={() => handleRemove(id)}
                  title="Remove this todo."
                />
              </td>
            );

          default:
            return (
              <td
                className="table__cell"
                key={field}
              >
                {field === 'completed' ? done : todoItem[field]}
              </td>
            );
        }
      })}
    </tr>
  );
};

TodoItem.propTypes = {
  todoItem: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleRemove: PropTypes.func.isRequired,
  head: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default TodoItem;
