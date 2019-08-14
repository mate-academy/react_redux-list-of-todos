import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  const [fieldOfSort, setSortField] = useState('user');
  const [sortStatus, setSortStatus] = useState(1);

  const sortMethod = {
    status: (a, b) => sortStatus * (a.completed - b.completed),
    todo: (a, b) => sortStatus * a.title.localeCompare(b.title),
    user: (a, b) => sortStatus * a.user.name.localeCompare(b.user.name),
  };

  const setfieldOfSort = (event) => {
    const newfieldOfSort = event.target.textContent.toLowerCase();
    if (fieldOfSort === newfieldOfSort) {
      setSortStatus(-sortStatus);
    } else {
      setSortField(newfieldOfSort);
    }
  };

  const getSortedTotos = () => ([...todos].sort(sortMethod[fieldOfSort]));

  return (
    <table className="table">
      <thead className="table-head">
        <th
          onClick={setfieldOfSort}
          className={fieldOfSort === 'status' ? 'active' : undefined}
        >
          Status
        </th>
        <th
          onClick={setfieldOfSort}
          className={fieldOfSort === 'todo' ? 'active' : undefined}
        >
          Todo
        </th>
        <th
          onClick={setfieldOfSort}
          className={fieldOfSort === 'user' ? 'active' : undefined}
        >
          User
        </th>
      </thead>
      <tbody>
        {
          getSortedTotos().map(todo => (
            <TodoItem
              {...todo}
              key={todo.id}
            />
          ))
        }
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
};

export default TodoList;
