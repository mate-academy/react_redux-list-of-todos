import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos, selectedSort, setSelectedSort }) => {
  const sortTableBy = (sortType) => {
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
      case 'completed':
        sortedTodos = [...todos]
          .sort((a, b) => b.completed.toString().localeCompare(
            a.completed.toString()
          ));
        break;
      default:
    }

    selectedSort === sortType
      ? setTodos([...todos].reverse())
      : setTodos(sortedTodos);
    setSelectedSort(sortType);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              className="title"
              style={{ cursor: 'pointer' }}
              onClick={() => sortTableBy('id')}
            >
              Sort by Id
            </th>
            <th
              className="title"
              style={{ cursor: 'pointer' }}
              onClick={() => sortTableBy('title')}
            >
              Sort by Title
            </th>
            <th
              className="title"
              style={{ cursor: 'pointer' }}
              onClick={() => sortTableBy('completed')}
            >
              Sort if is completed
            </th>
            <th
              className="title"
              style={{ cursor: 'pointer' }}
              onClick={() => sortTableBy('user')}
            >
              Sort by Name
            </th>
            <th className="title">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (

            <TodoItem todo={todo} />
          ))}
        </tbody>
      </table>
    </div>
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
