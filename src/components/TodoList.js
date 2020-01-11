import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const thList = {
  id: 'ID',
  title: 'Definition',
  'user.username': 'Responsible',
  completed: 'Status',
};

const TodoList = ({ todos, filter }) => (
  <table className="Table">
    <thead className="thead">
      <tr>
        {Object.keys(thList).map(key => (
          <th
            onClick={() => filter(key)}
            key={key}
          >
            {thList[key]}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.func.isRequired,
};

export default TodoList;
