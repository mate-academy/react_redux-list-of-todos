import React from 'react';
import { useDispatch, connect } from 'react-redux';
import './App.scss';

import { getTodos, getUsers } from './api';
import { getSortedTodos, setTodos } from './store';


const App = ({
  loading,
  message,
  loaded,
  startLoading,
  finishLoading,
  setLoaded,
  sortedTodos,
  setSortField,
  killTodo,
}: any) => {
  const dispatch = useDispatch();

  const loadTodosFromServer = async () => {
    startLoading();
    try {
      const todos = await getTodos();
      const users = await getUsers();

      dispatch(setTodos({ todos, users }));
      finishLoading();
      setLoaded();
    } catch (error) {
      finishLoading();
    }
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>
        {loading
          ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )
          : message}
      </h2>

      {loaded
        && (
          <>
            <button
              type="button"
              onClick={() => setSortField('title')}
              className="btn btn-primary"
            >
              sortBytitle
            </button>

            <button
              type="button"
              onClick={() => setSortField('name')}
              className="btn btn-primary"
            >
              sortByname
            </button>

            <button
              type="button"
              onClick={() => setSortField('completed')}
              className="btn btn-primary"
            >
              sortByCompleted
            </button>
          </>
        )}

      {!loaded
        && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={loadTodosFromServer}
          >
            {loading ? 'Loading...' : 'Load'}
          </button>
        )}

      {loaded && (
        <ul>
          {sortedTodos.map((item: any) => (
            <div
              className={item.completed
                ? 'card text-white bg-success mb-3'
                : 'card text-white bg-danger mb-3'}
              style={{ maxWidth: '18rem' }}
            >
              <div className="card-header">
                {item.user.name}
                <button type="button" onClick={() => killTodo(item.id)}>X</button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          ))}
        </ul>
      )}

    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.loading,
  message: state.message,
  sortedTodos: getSortedTodos(state),
  loaded: state.loaded,
  sortField: state.sortField,
});

const mapDispatchToProps = (dispatch: any) => ({
  setSortField: (sortField: string) => dispatch({ type: 'SORT_BY', sortField }),
  startLoading: () => dispatch(
    { type: 'START_LOADING' },
  ),
  finishLoading: (message: string) => dispatch({
    type: 'FINISH_LOADING',
    message,
  }),
  setLoaded: () => dispatch({ type: 'IS_LOADED' }),
  killTodo: (id: number) => dispatch({ type: 'KILL', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
