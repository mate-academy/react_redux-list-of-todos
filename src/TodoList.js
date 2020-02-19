/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  sortedbyName, sortedbyId, sortedByTitle, sortedByCompleted,
} from './store';
import TodoItem from './TodoItem';

const TodoList = ({
  // eslint-disable-next-line react/prop-types
  todos, sortedbyName, sortedbyId, sortedByTitle, sortedByCompleted,
}) => (
  <table className="App">
    <thead>
      <tr>
        <th><button type="button" onClick={sortedbyId}>id</button></th>
        <th><button type="button" onClick={sortedbyName}>name</button></th>
        <th><button type="button" onClick={sortedByTitle}>title</button></th>
        <th>
          <button type="button" onClick={sortedByCompleted}>Completed</button>
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.shape().isRequired,
  sortedbyName: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sortedbyName: () => dispatch(sortedbyName()),
  sortedbyId: () => dispatch(sortedbyId()),
  sortedByTitle: () => dispatch(sortedByTitle()),
  sortedByCompleted: () => dispatch(sortedByCompleted()),
});

export default connect(
  null,
  mapDispatchToProps,
)(TodoList);
