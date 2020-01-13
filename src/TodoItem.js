import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TodoItem = ({ todo, todos, setTodos }) => {
  const deleteTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <tr>
      <th>{todo.id}</th>
      <th>{todo.title}</th>
      <th>{todo.completed ? '✅' : '❌'}</th>
      <th>{todo.user.name}</th>
      <td>
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          <span>&#128465;</span>
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
