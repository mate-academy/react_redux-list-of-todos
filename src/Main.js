import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import getTodosWithUsers from './GetTodosWithUsers';
import store from './store';
import getURL from './api/getUrl';

function Main({
  todos,
  settodos,
  loaded,
  setLoaded,
  isLoading,
  setIsLoading,
}) {
  const LoadTodos = async() => {
    setIsLoading(true);

    const [usersObject, todosObject]
    = await Promise.all([
      getURL('https://jsonplaceholder.typicode.com/users'),
      getURL('https://jsonplaceholder.typicode.com/todos'),
    ]);

    settodos(getTodosWithUsers(todosObject, usersObject));
    setIsLoading(false);
    setLoaded(true);
  };

  if (isLoading === true) {
    return (
      <div className="App">
        <p> ...LOADING </p>
      </div>
    );
  }

  if (loaded === false) {
    return (
      <div className="App">
        <button type="button" onClick={LoadTodos}>
          Load
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <TodoList todos={todos} />
    </div>
  );
}

const mapStateToProps = state => ({
  todos: state.todos,
  loaded: state.loaded,
  isLoading: state.isLoading,
});

const dataMethods = () => ({
  settodos: newtodos => store.dispatch({
    type: 'CHANGE_ROW',
    todos: newtodos,
  }),
  setLoaded: changeLoaded => store.dispatch({
    type: 'CHANGE_LOADED',
    loaded: changeLoaded,
  }),
  setIsLoading: changeIsLoading => store.dispatch({
    type: 'CHANGE_IS_LOADING',
    isLoading: changeIsLoading,
  }),
});

Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.any).isRequired,
  settodos: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setLoaded: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, dataMethods)(Main);
