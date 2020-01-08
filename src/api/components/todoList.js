import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  handleDelete,
} from '../../store';

const TodoList = ({ todos, handleDeleteTodo }) => (
  <>
    {todos.map(todo => (
      <tr key={todo.id}>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <td>
          {todo.completed === true
            ? 'completed'
            : 'no completed'}
        </td>
        <td>
          {todo.user.name}
        </td>
        <td>
          {todo.user.email}
        </td>
        <td>
          <button
            type="button"
            onClick={() => handleDeleteTodo(todo.id)}
          >
              Delete
          </button>
        </td>
      </tr>
    ))}
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

TodoList.propTypes = {
  handleDeleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  })).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
