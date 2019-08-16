import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAllTodos from './components/util/TodoApi';
import getAllUsers from './components/util/UserApi';
import TodoList from './components/todo-list/TodoList';

import { startLoading, finishLoading } from './redux/loading';
import { setTodos } from './redux/todosData';

const App = ({
// eslint-disable-next-line no-shadow
  isLoading, startLoading, setTodos, finishLoading, todos,
}) => {
  const loadData = async() => {
    startLoading();

    const [todoList, users] = await Promise.all([
      getAllTodos(),
      getAllUsers(),
    ]);
    const items = getTodosWithUsers(todoList, users);

    setTodos(items);
    finishLoading();
  };

  const getTodosWithUsers = (todoList, users) => todoList.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center "
    >
      <h1 className="text-center mb-3 mt-3">React dynamic list of todos</h1>
      { todos ? (
        <TodoList />
      ) : (
        <button
          type="button"
          onClick={loadData}
          className="btn btn-dark btn-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </div>
  );
};

const mapState = state => ({
  isLoading: state.isLoading,
  todos: state.todosData.initialTodos || '',
});

const mapDispatch = {
  startLoading, finishLoading, setTodos,
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  startLoading: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array),
  ]).isRequired,
};

export default connect(mapState, mapDispatch)(App);
