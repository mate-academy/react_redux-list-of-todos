/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const todosAreLoading = useAppSelector(
    (state) => (state.todos.loading),
  );
  const currentModal = useAppSelector(
    (state) => (state.currentTodo),
  );
  const { setLoading, setTodos } = actions;
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const loadTodos = async () => {
    dispatch(setLoading(true));
    try {
      const todosFromServer = await getTodos();

      dispatch(setTodos(todosFromServer));
    } catch {
      setIsError(true);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

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
              {todosAreLoading && (
                <Loader />
              )}
              {!todosAreLoading && (
                <TodoList
                  isError={isError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentModal && (
        <TodoModal />
      )}
    </>
  );
};
