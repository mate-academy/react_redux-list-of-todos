import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateAt, setUpdateAt] = useState(new Date());

  const filterTodos = () => {
    return todos.filter((todo) => {
      switch (status) {
        case FilterBy.active:
          return !todo.completed;
        case FilterBy.completed:
          return todo.completed;
        default:
          return true;
      }
    }).filter((todo) => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  };

  function reload() {
    setUpdateAt(new Date());
    setErrorMessage('');
  }

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(fetchingTodos => dispatch(todosActions.setTodos(fetchingTodos)))
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setIsLoading(false));
  }, [updateAt, dispatch]);

  const filteredTodos = filterTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              {!isLoading && !!todos.length && (
                <TodoList todos={filteredTodos} />
              )}

              {errorMessage && (
                <p className="notification is-danger">
                  {errorMessage}
                  <button type="button" onClick={reload}>
                    Reload
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
