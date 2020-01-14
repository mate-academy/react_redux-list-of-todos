import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setActiveColumn,
  setDirection,
  getActiveColumn,
  getDirection,
} from './store';
import TodoItem from './TodoItem';

const HEADERS = {
  id: 'Id',
  title: 'Description',
  completed: 'Is completed?',
  user: 'Responsible person',
};

const TodoList = (
  { list, activeColumn, direction, setCurrentColumn, setCurrentDirection }
) => {
  const sortList = (clickedColumn) => {
    if (activeColumn !== clickedColumn) {
      setCurrentDirection('asc');
      setCurrentColumn(clickedColumn);
    } else {
      setCurrentDirection(direction === 'asc' ? 'desc' : 'asc');
    }
  };

  const by = {
    string: (a, b) => a[activeColumn].localeCompare(b[activeColumn]),
    number: (a, b) => a[activeColumn] - b[activeColumn],
    boolean: (a, b) => b[activeColumn] - a[activeColumn],
    object: (a, b) => a[activeColumn].name.localeCompare(b[activeColumn].name),
  };
  const sortType = typeof list[0][activeColumn];
  const callback = by[sortType] || (() => 0);
  const sortedTodos = list.sort(callback);

  if (direction === 'desc') {
    sortedTodos.reverse();
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(HEADERS).map(header => (
            <th
              onClick={() => sortList(header)}
              key={header}
            >
              {HEADERS[header]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedTodos.map(todo => (
          <TodoItem key={todo.id} item={todo} />))}
      </tbody>
    </table>
  );
};

const getData = state => ({
  activeColumn: getActiveColumn(state),
  direction: getDirection(state),
});

const getMethods = {
  setCurrentColumn: setActiveColumn,
  setCurrentDirection: setDirection,
};

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  activeColumn: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  setCurrentColumn: PropTypes.func.isRequired,
  setCurrentDirection: PropTypes.func.isRequired,
};

export default connect(getData, getMethods)(TodoList);
