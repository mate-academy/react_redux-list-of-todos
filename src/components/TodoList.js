import React from 'react';
import PropTypes from 'prop-types';
import { TodoItemHandler } from './TodoItemHandler';

export function TodoList(props) {
  const {
    requested,
    handleClick,
    loadedUsers,
    loadedTodos,
    users,
    filteredTodos,
    filterChanged,
  } = props;
  if (!requested) {
    return <input type="button" onClick={handleClick} value="Download todos!" />;
  } if (loadedUsers && loadedTodos) {
    const userMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});

    const todos = filteredTodos.map((todo, index) => (
      <TodoItemHandler
        title={todo.title}
        completed={todo.completed}
        key={todo.id}
        user={userMap[todo.userId]}
        index={index}
      />
    ));

    return (
      <div>
        <input type="text" placeholder="search by title" onChange={filterChanged} />
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Completed</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {todos}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <input type="button" disabled value="Loading..." />
  );
}

TodoList.propTypes = {
  requested: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  loadedUsers: PropTypes.bool.isRequired,
  loadedTodos: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterChanged: PropTypes.func.isRequired,
};
