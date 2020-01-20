import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, todos, setTodos }) => {
  const deleteTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.user.name}</td>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <td>{todo.completed ? <span>&#9989;</span> : <span>&#10060;</span>}</td>
      <td>
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          <span>&#10008;</span>
        </button>
      </td>
    </tr>
  );
};

const getData = state => ({
  todos: state.todos,
});

const getMethods = dispatch => ({
  setTodos: newTodos => dispatch({
    type: 'SET_TODOS',
    todos: newTodos,
  }),
});

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
    completed: PropTypes.bool,
  }).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(TodoItem);
