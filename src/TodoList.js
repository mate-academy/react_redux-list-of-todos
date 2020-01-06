import PropTypes from 'prop-types';
import React from 'react';
import TodoItemHandler from './TodoItemHandler';

const TodoList = ({ todos, sortField, sortAsc, handleSort }) => {
  const head = ['id', 'title', 'name', 'email', 'completed', 'remove item'];
  const arrowUp = '↑';
  const arrowDown = '↓';

  return (
    <table className="table">
      <thead>
        <tr>
          {head.map(headItem => (
            <th
              key={headItem}
              className="table__head-cell"
            >
              {headItem !== 'remove item' ? (
                <button
                  className="button button_head"
                  type="button"
                  onClick={() => handleSort(headItem)}
                >
                  {headItem === 'completed' ? 'status' : headItem}

                  {sortField === headItem && sortAsc && (
                    <span className="arrow">{arrowDown}</span>
                  )}
                  {sortField === headItem && !sortAsc && (
                    <span className="arrow">{arrowUp}</span>
                  )}
                </button>
              ) : (
                <span
                  className="table__head-cell_non-sortable"
                >
                  {headItem}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoItemHandler todoItem={todo} key={todo.id} head={head} />
        ))}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleSort: PropTypes.func.isRequired,
  sortField: PropTypes.string.isRequired,
  sortAsc: PropTypes.bool.isRequired,
};

export default TodoList;
