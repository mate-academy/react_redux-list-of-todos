import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodoItem from './TodoItem';
import { titles } from './store';

const TodoList = ({ todos, sortingTitle, setSortBy, removeTodo }) => (
  <table className="todo-list__table">
    <thead>
      <tr>
        {titles.map((title) => {
          switch (title) {
            case 'remove':
              return (
                <th
                  key={title}
                  className="table__heading"
                >
                  {title.toUpperCase()}
                </th>
              );
            default:
              return (
                <th
                  key={title}
                  onClick={() => setSortBy(title)}
                  className={cn(
                    'table__heading',
                    'table__heading--sortable',
                    { 'table__heading--selected': title === sortingTitle }
                  )}
                >
                  {title.toUpperCase()}
                </th>
              );
          }
        })}
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortingTitle: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoList;
