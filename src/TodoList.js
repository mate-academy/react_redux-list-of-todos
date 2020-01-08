import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { TABLE_HEADERS } from './const';

const TodoList = ({ todos, sortByField }) => (
  <table className="todo">
    <thead>
      <tr>
        {TABLE_HEADERS.map(header => (
          <th
            key={header.code}
            onClick={() => sortByField(header.code, header.type)}
          >
            {header.title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {todos.map(
        todoItem => <TodoItem key={todoItem.id} todo={todoItem} />
      )}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortByField: PropTypes.func.isRequired,
};

export default TodoList;
