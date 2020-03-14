import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getUsers, getTodos } from './utils/api';
import { TodoList } from './components/TodoList/TodoList';
import { setLoaded as setLoadedData } from './store/store';

import './App.css';

interface Props {
  todos: TodoWithUsers[];
  isLoading: boolean;
  setLoaded: (done: boolean) => void;
  setTodos: (todos: TodoWithUsers[]) => void;
  sortByTitle: () => void;
  sortByUserName: () => void;
  sortByStatus: () => void;
}

const App: FC<Props> = (props) => {
  const {
    todos,
    isLoading,
    setLoaded,
    setTodos,
    sortByTitle,
    sortByUserName,
    sortByStatus,
  } = props;

  const handleClickLoad = () => {
    setLoaded(true);

    Promise.all([getUsers(), getTodos()])
      .then(([usersFromApi, todosFromApi]) => {
        setTodos(todosFromApi.map(todo => ({
          ...todo,
          user: usersFromApi.find(user => user.id === todo.userId) as User,
        })));
      })
      .finally(() => setLoaded(false));
  };

  if (!todos.length) {
    return (
      <div className="App">
        <h1 className="title">Dynamic list of TODOs</h1>
        <>
          <button
            type="button"
            className="button button-start"
            onClick={handleClickLoad}
            disabled={isLoading}
          >
            Load
          </button>
        </>
        {isLoading && (
          <p className="text">Loading...</p>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Dynamic list of TODOs</h1>
      <div className="buttons">
        <button
          type="button"
          className="button"
          onClick={sortByUserName}
        >
          Sort by name~
        </button>
        <button
          type="button"
          className="button"
          onClick={sortByTitle}
        >
          Sort by title
        </button>
        <button
          type="button"
          className="button"
          onClick={sortByStatus}
        >
          Sort by readiness
        </button>
      </div>
      <TodoList todos={todos} />

      {!todos.length && (
        <button type="button" onClick={handleClickLoad} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    todos: state.todos,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLoaded: (done: boolean) => dispatch(setLoadedData(done)),
    setTodos: (todos: TodoWithUsers[]) => dispatch({ type: 'SET_TODOS', payload: todos }),
    sortByTitle: () => dispatch({ type: 'SORT_BY_TITLE' }),
    sortByStatus: () => dispatch({ type: 'SORT_BY_STATUS' }),
    sortByUserName: () => dispatch({ type: 'SORT_BY_USERNAME' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
