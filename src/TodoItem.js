import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { handleRemove } from './store';
import User from './User';

const TodoItem = ({ todoItem, handleDelete, headers }) => {
  const { user, id, completed } = todoItem;
  const done = completed ? 'done' : 'not done';

  return (
    <tr className="table__row">
      {Object.values(headers).map((field) => {
        switch (field) {
          case headers.name:
            return (
              <User name={user.name} email={user.email} key={field} />
            );

          case headers.remove:
            return (
              <td
                className="table__cell table__cell_remove"
                key={field}
              >
                <button
                  type="button"
                  className="button_remove"
                  onClick={() => handleDelete(id)}
                  title="Remove this todo."
                />
              </td>
            );

          case headers.id:
          case headers.title:
          case headers.completed:
            return (
              <td
                className="table__cell"
                key={field}
              >
                {field === 'completed' ? done : todoItem[field]}
              </td>
            );

          default:
            return null;
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
  handleDelete: PropTypes.func.isRequired,
  headers: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    remove: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(null, { handleDelete: handleRemove })(TodoItem);
