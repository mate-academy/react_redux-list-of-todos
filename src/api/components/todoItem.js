import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleDelete } from '../../store';

const TodoItem
  = ({ id, title, completed, userName, userEmail, handleDeleteTodo }) => (
    <>
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          {completed === true
            ? 'completed'
            : 'no completed'}
        </td>
        <td>
          {userName}
        </td>
        <td>
          {userEmail}
        </td>
        <td>
          <button
            type="button"
            onClick={() => handleDeleteTodo(id)}
          >
            Delete
          </button>
        </td>
      </tr>

    </>
  );

const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
  hasError: state.hasError,
});

const mapDispatchToProps = dispatch => ({
  handleDeleteTodo: peyload => dispatch(handleDelete(peyload)),
});

TodoItem.propTypes = {
  handleDeleteTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
