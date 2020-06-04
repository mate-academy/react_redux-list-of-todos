import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { TodoList } from './TodoList';
import { getPreparedTodos } from './api';
import { BY_TITLE, BY_NAME, BY_STATUS } from './store/constants';
import {
  startLoading,
  finishLoading,
  getVisibleTodos,
  getIsLoaded,
  getIsLoading,
  setSortField,
  setTodos,
  handleError,
  getError,
} from './store';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getVisibleTodos);
  const isLoaded = useSelector(getIsLoaded);
  const isLoading = useSelector(getIsLoading);
  const errorMessage = useSelector(getError);


  const loadedTodos = () => {
    dispatch(startLoading());
    getPreparedTodos()
      .then((todosFromServer) => {
        dispatch(setTodos(todosFromServer));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(handleError(e.message));
      });
  };

  return (
    <div className="container">
      <h1>Dynamic list of TODOs</h1>
      {!isLoaded
        ? (
          <>
            <button
              type="button"
              className="button"
              onClick={loadedTodos}
            >
              {isLoading ? 'Loading...' : 'Click to Load'}
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </>
        )
        : (
          <>
            <div className="button__container">
              <button
                className="button"
                type="button"
                onClick={() => dispatch(setSortField(BY_TITLE))}
              >
                Sort By Title
              </button>
              <button
                className="button"
                type="button"
                onClick={() => dispatch(setSortField(BY_NAME))}
              >
                Sort By Name
              </button>
              <button
                className="button"
                type="button"
                onClick={() => dispatch(setSortField(BY_STATUS))}
              >
                Sort By Status
              </button>
            </div>

            <TodoList todos={todos} />

          </>
        )}
    </div>
  );
};

export default App;
