import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos, selectedSort, setSelectedSort }) => {
  const sort = (sortType) => {
    let sortedTodos = [];

    switch (sortType) {
      case 'id':
        sortedTodos = [...todos].sort((a, b) => a.id - b.id);
        break;
      case 'title':
        sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'user':
        sortedTodos = [...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name));
        break;
      case 'status':
        sortedTodos = [...todos].sort((a, b) => +b.completed - +a.completed);
        break;
      default:
    }

    selectedSort === sortType
      ? setTodos([...todos].reverse())
      : setTodos(sortedTodos);
    setSelectedSort(sortType);
  };

  return (
    <table className="pure-table pure-table-bordered">
      <thead>
        <tr>
          <th className="td" onClick={() => sort('id')}>Id</th>
          <th className="td" onClick={() => sort('title')}>Title</th>
          <th className="td" onClick={() => sort('user')}>User</th>
          <th className="td" onClick={() => sort('status')}>Status</th>
          <th className="td">Delete task</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => <TodoItem todo={todo} />)}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  selectedSort: PropTypes.string.isRequired,
  setSelectedSort: PropTypes.func.isRequired,
};

const getData = state => ({
  todos: state.todos,
  selectedSort: state.selectedSort,
});

const getMethods = dispatch => ({
  setTodos: newTodos => dispatch({
    type: 'SET_TODOS',
    todos: newTodos,
  }),
  setSelectedSort: type => dispatch({
    type: 'SET_SORT_TYPE',
    selectedSort: type,
  }),
});

export default connect(getData, getMethods)(TodoList);
