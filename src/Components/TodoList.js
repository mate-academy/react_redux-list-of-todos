import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../index.css';
import {
  setActiveColumn,
  setDirection,
  getActiveColumn,
  getDirection,
} from './List';
import TodoItem from './TodoItems';

const HEADERS = {
  id: 'Id',
  title: 'Title',
  completed: 'Completed',
  user: 'Name',
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

  const filter = {
    string: (x, y) => x[activeColumn].localeCompare(y[activeColumn]),
    number: (x, y) => x[activeColumn] - y[activeColumn],
    boolean: (x, y) => y[activeColumn] - x[activeColumn],
    object: (x, y) => x[activeColumn].name.localeCompare(y[activeColumn].name),
  };
  const sortType = typeof list[0][activeColumn];
  const callback = filter[sortType] || (() => 0);
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
  ),
  activeColumn: PropTypes.string,
  direction: PropTypes.string,
  setCurrentColumn: PropTypes.func,
  setCurrentDirection: PropTypes.func,
}.isRequired;

export default connect(getData, getMethods)(TodoList);
