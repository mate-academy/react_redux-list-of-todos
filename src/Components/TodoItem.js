import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionTypes } from '../store/store';
import User from './User';

const TodoItem = ({ todos, todo, setTodos }) => {
  const deleteTodo = () => {
    setTodos(todos.filter(todoItem => todoItem.id !== todo.id));
  };

  return (
    <tbody>
      <tr>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <User userData={todo.user} />
        <td
          className={todo.completed ? 'completed' : 'not-completed'}
        >
          {todo.completed ? 'yes' : 'no'}
        </td>
        <td>
          <button
            type="button"
            onClick={deleteTodo}
          >
            x
          </button>
        </td>
      </tr>
    </tbody>
  );
};

const getData = state => ({
  todos: state.todos,
  sortedTodos: state.sortedTodos,
});

const getMethods = dispatch => ({
  setTodos: newTodos => dispatch({
    type: actionTypes.SET_TODOS,
    todos: newTodos,
  }),
});

TodoItem.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setTodos: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};

export default connect(getData, getMethods)(TodoItem);
