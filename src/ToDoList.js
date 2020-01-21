import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';
import { getActiveColumn, getOrder, setSortedBy, setOrder } from './store';

const ToDoList = (
  { todos, activeColumn, order, currentSortedColumn, currentSortedOrder },
) => {
  const sortColumn = (field) => {
    if (activeColumn !== field) {
      currentSortedOrder('asc');
      currentSortedColumn(field);
    } else {
      currentSortedOrder(order === 'asc' ? 'desc' : 'asc');
    }
  };

  const typesOfCallbacks = {
    string: (a, b) => a[activeColumn].localeCompare(b[activeColumn]),
    number: (a, b) => a[activeColumn] - b[activeColumn],
    boolean: (a, b) => a[activeColumn] - b[activeColumn],
    object: (a, b) => a[activeColumn].name.localeCompare(b[activeColumn].name),
  };

  const typeOfColumn = typeof todos[0][activeColumn];
  const callback = typesOfCallbacks[typeOfColumn];
  const sortedTodos = todos.sort(callback);

  if (order === 'desc') {
    sortedTodos.reverse();
  }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => sortColumn('title')}>Title</th>
          <th onClick={() => sortColumn('user')}>User</th>
          <th onClick={() => sortColumn('completed')}>State</th>
        </tr>
      </thead>
      <tbody>
        {sortedTodos.map(({ title, id, completed, user: { name } }) => (
          <ToDoItem
            key={id}
            completed={completed}
            name={name}
            title={title}
          />
        ))}
      </tbody>
    </table>
  );
};

const getData = state => ({
  activeColumn: getActiveColumn(state),
  order: getOrder(state),
});
const getMethods = ({
  currentSortedColumn: setSortedBy,
  currentSortedOrder: setOrder,
});

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeColumn: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  currentSortedOrder: PropTypes.func.isRequired,
  currentSortedColumn: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(ToDoList);
