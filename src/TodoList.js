import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTodos } from './redux/store';
import TodoItem from './TodoItem';

const TodoList = ({ todos, todosHandle }) => {
  const sortTodos = (column) => {
    const sortData = [...todos].sort((a, b) => {
      switch (typeof a[column]) {
        case 'string':
          return a[column].localeCompare(b[column]);
        case 'number':
        case 'boolean':
          return a[column] - b[column];
        default:
          return 0;
      }
    });

    if (sortData[0].id === todos[0].id) {
      sortData.reverse();
    }

    todosHandle(sortData);
  };

  return (
    <table
      className="app__table"
      border={1}
    >
      <thead>
        <tr>
          <th onClick={() => sortTodos('id')}>№</th>
          <th onClick={() => sortTodos('title')}>Todo</th>
          <th onClick={() => sortTodos('completed')}>Completed</th>
          <th onClick={() => sortTodos('userName')}>User Name</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.title}>
            <TodoItem todo={todo} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getData = state => ({
  todos: state.todos,
});

const getMethods = dispatch => ({
  todosHandle: newTodos => dispatch(getTodos(newTodos)),
});

TodoList.propTypes = {
  todos: PropsTypes.arrayOf.isRequired,
  todosHandle: PropsTypes.func.isRequired,
};

export default connect(getData, getMethods)(TodoList);
