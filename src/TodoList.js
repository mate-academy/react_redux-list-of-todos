import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <table className="pure-table pure-table-bordered">
    <thead>
      <tr>
        <td>Id</td>
        <td>Title</td>
        <td>User</td>
        <td>Status</td>
        <td>Delete task</td>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <TodoItem todo={todo} />)}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const getData = state => ({
  todos: state.todos,
});

export default connect(getData)(TodoList);
