import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { handleSort, getTodos,
  getSortedAsc, getSortField,
  getPrevSortField } from './store';
import TodoItem from './TodoItem';

const TABLE_HEADERS = {
  id: 'id',
  title: 'title',
  name: 'name',
  email: 'email',
  completed: 'completed',
  remove: 'remove',
};

const arrowUp = '↑';
const arrowDown = '↓';

const TodoList = (props) => {
  const { todos, sortField, sortedAsc, sortHandler, prevSortField } = props;
  const sortedTodos = [...todos]
    .sort((todoA, todoB) => {
      const comparator1 = todoA[sortField]
          || todoA.user[sortField];
      const comparator2 = todoB[sortField]
          || todoB.user[sortField];

      switch (typeof comparator1) {
        case 'number':
          return !sortedAsc && prevSortField === sortField
            ? comparator2 - comparator1 : comparator1 - comparator2;
        default:
          return !sortedAsc && prevSortField === sortField
            ? String(comparator2).localeCompare(String(comparator1))
            : String(comparator1).localeCompare(String(comparator2));
      }
    });

  return (
    <table className="table">
      <thead>
        <tr>
          {Object.values(TABLE_HEADERS).map(headItem => (
            <th
              key={headItem}
              className="table__head-cell"
            >
              {headItem !== TABLE_HEADERS.remove ? (
                <button
                  className="button button_head"
                  type="button"
                  onClick={() => sortHandler(headItem)}
                >
                  {headItem === 'completed' ? 'status' : headItem}

                  {sortField === headItem && sortedAsc && (
                    <span className="arrow">{arrowDown}</span>
                  )}
                  {sortField === headItem && !sortedAsc && (
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
        {sortedTodos.map(todo => (
          <TodoItem
            todoItem={todo}
            key={todo.id}
            headers={TABLE_HEADERS}
          />
        ))}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  sortHandler: PropTypes.func.isRequired,
  sortField: PropTypes.string.isRequired,
  prevSortField: PropTypes.string.isRequired,
  sortedAsc: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  todos: getTodos(state),
  sortedAsc: getSortedAsc(state),
  sortField: getSortField(state),
  prevSortField: getPrevSortField(state),
});

export default connect(mapStateToProps, { sortHandler: handleSort })(TodoList);
