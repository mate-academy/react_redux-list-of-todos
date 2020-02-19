/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable semi */
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import { deleteTodo } from './store';

const TodoItem = ({ todo, deleteTodo }) => (
  <tr className="App__table_container">
    <td>{todo.id}</td>
    <td className="bold">{todo.user.name}</td>
    <td className="align-left">{todo.title}</td>
    <td>
      <input type="checkbox" defaultChecked={todo.completed} />
      {todo.completed}
    </td>
    <td>
      <button
        type="button"
        onClick={() => { deleteTodo(todo.id) }}
      >
          Delete
      </button>

    </td>
  </tr>
)

TodoItem.propTypes = {
  deleteTodo: PropTypes.func,
  todo: PropTypes.shape({
    completed: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteTodo: value => dispatch(deleteTodo(value)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TodoItem);
