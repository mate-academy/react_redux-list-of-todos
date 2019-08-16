import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import { deleteAction } from './actionCreator';

function TodoItem({ todo, deleteTodo }) {
  return (
    <tr>
      <td>{todo.todo.id}</td>
      <td>{todo.todo.title}</td>
      <User todo={todo} />
      <td className="table-noborder">
        <button
          type="button"
          className="table--button"
          onClick={() => deleteTodo(todo.todo.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: [...state.todos],
});

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(deleteAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoItem);
