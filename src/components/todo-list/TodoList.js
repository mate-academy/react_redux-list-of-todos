import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoItem from '../todo-item/TodoItem';
import {
  sortByCompleted, sortByTitle, sortByUser, removeTodo,
  SORT_ORDER_COMPLETED, SORT_ORDER_TITLE, SORT_ORDER_USER,
} from '../../redux/todosData';

const TodoList = ({
// eslint-disable-next-line no-shadow
  sortByUser, sortByCompleted, sortByTitle, removeTodo,
  sortedTodos, fieldDirection, fieldName,
}) => {
  const sortOrderArrow = fieldDirection === 1
    ? <span>&#8595;</span>
    : <span>&#8593;</span>;
  const defaultSortArrow = <span>&#11021;</span>;

  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th
            scope="col"
            className="text-center"
            onClick={sortByCompleted}
          >
            <span className="mr-3">Status</span>
            <span>
              {fieldName === SORT_ORDER_COMPLETED
                ? sortOrderArrow
                : defaultSortArrow}
            </span>
          </th>
          <th
            scope="col"
            onClick={sortByTitle}
          >
            <span className="mr-3">Task</span>
            <span>
              {fieldName === SORT_ORDER_TITLE
                ? sortOrderArrow
                : defaultSortArrow}
            </span>
          </th>
          <th
            scope="col"
            onClick={sortByUser}
          >
            <span className="mr-3">User</span>
            <span>
              {fieldName === SORT_ORDER_USER
                ? sortOrderArrow
                : defaultSortArrow}
            </span>
          </th>
          <th scope="col">
            <span className="text-center">Remove</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTodos.map((item) => {
          const {
            id, completed, title, user,
          } = item;
          return (
            <TodoItem
              key={id}
              completed={completed}
              id={id}
              text={title}
              user={user}
              removeTodo={removeTodo}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const mapState = state => ({
  sortedTodos: state.todosData.sortedTodos,
  fieldDirection: state.todosData.sortField.fieldDirection,
  fieldName: state.todosData.sortField.name,
});

const mapDispatch = {
  sortByCompleted, sortByTitle, sortByUser, removeTodo,
};

TodoList.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldDirection: PropTypes.number.isRequired,
  sortByCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  sortByTitle: PropTypes.func.isRequired,
  sortByUser: PropTypes.func.isRequired,
  sortedTodos: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array),
  ]).isRequired,
};

export default connect(mapState, mapDispatch)(TodoList);
