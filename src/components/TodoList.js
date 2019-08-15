import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';
import { getTodos } from './store';

const TodoList = ({ todos, deleteTodo }) => (
  <table className="todo-list-table">
    <thead>
      <tr className="todo-list-table__titles">
        <th
          data-sort-type="name"
          data-column="0"
          className="todo-list-table__title"
        >
          User Name
        </th>
        <th
          data-sort-type="name"
          data-column="1"
          className="todo-list-table__title"
        >
          E-mail
        </th>
        <th
          data-sort-type="name"
          data-column="2"
          className="todo-list-table__title"
        >
          Phone
        </th>
        <th
          data-sort-type="todos"
          data-column="3"
          className="todo-list-table__title"
        >
          Tasks
        </th>
        <th
          data-sort-type="todos"
          data-column="4"
          className="todo-list-table__title"
        />
      </tr>
    </thead>
    <tbody className="todo-list-table__tasks">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
        />
      ))}
    </tbody>
  </table>
);

const getData = state => ({
  todos: getTodos(state),
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default connect(getData)(TodoList);
