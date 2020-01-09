import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';

import {
  handleSortType,
  handleIsReversed,

  getIsReversed,
  getTodos,
  getSortType,
} from '../store';

const TodoList = (
  {
    todos, sortType, setSortType,
    isReversed, setReversed,
  }
) => {
  let visibleTodos = todos;

  const sortTodos = (type) => {
    setSortType(type);

    isReversed === true
      ? setReversed(false)
      : setReversed(true);
  };

  if (isReversed) {
    visibleTodos = visibleTodos.reverse();
  } else {
    switch (sortType) {
      case 'id':
      case 'completed':
        visibleTodos = [...todos]
          .sort((a, b) => a[sortType] - b[sortType]);
        break;
      case 'title':
        visibleTodos = [...todos]
          .sort((a, b) => a[sortType].localeCompare(b[sortType]));
        break;
      case 'user':
        visibleTodos = [...todos]
          .sort((a, b) => a[sortType].name.localeCompare(b[sortType].name));
        break;
      default:
    }
    setReversed(false);
  }

  return (
    <table>
      <thead>
        <tr>
          <th
            onClick={() => sortTodos('id')}
          >
            #id
          </th>
          <th
            onClick={() => sortTodos('user')}
          >
              user name
          </th>
          <th
            onClick={() => sortTodos('title')}
          >
            what need to be done
          </th>
          <th
            onClick={() => sortTodos('completed')}
          >
            completed or no
          </th>
        </tr>
      </thead>
      <tbody>
        { visibleTodos.map(({ id, user, title, completed }) => (
          <tr key={id}>
            <td>{id}</td>
            <User user={user} />
            <td>{title}</td>
            <td>{completed ? '✅' : '❌'}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  todos: getTodos(state),
  sortType: getSortType(state),
  isReversed: getIsReversed(state),
});

const mapDispatchToProps = dispatch => ({
  setSortType: sortTypeValue => dispatch(handleSortType(sortTypeValue)),
  setReversed: val => dispatch(handleIsReversed(val)),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TodoList);

TodoList.propTypes = {
  sortType: PropTypes.string.isRequired,
  setSortType: PropTypes.func.isRequired,
  isReversed: PropTypes.bool.isRequired,
  setReversed: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
