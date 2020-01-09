import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleDelete } from '../redux/store';

const TodoItem = (props) => {
  // eslint-disable-next-line no-shadow
  const { id, title, completed, userName, userEmail, handleDelete } = props;

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          {completed === true
            ? 'completed'
            : 'no completed'}
        </td>
        <td>{userName}</td>
        <td>{userEmail}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

const mapStateToProps = state => ({
  todoList: state.todoList,
});

TodoItem.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { handleDelete })(TodoItem);
