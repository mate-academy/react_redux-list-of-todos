import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { sortData } from '../store';

// eslint-disable-next-line no-shadow
const TodoList = ({ data, sortData }) => (
  <div className="App">
    <h1 className="heading">
        Count:
      {' '}
      { data.length }
    </h1>
    <table>
      <thead>
        <tr>
          <th onClick={() => sortData('id')}>Id</th>
          <th onClick={() => sortData('title')}>Title</th>
          <th onClick={() => sortData('completed')}>Completed</th>
          <th onClick={() => sortData('name')}>Name</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  </div>
);

TodoList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
  sortData: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({ data }) => ({ data });

export default connect(mapStateToProps, { sortData })(TodoList);
