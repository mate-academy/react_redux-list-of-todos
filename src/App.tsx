/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const loadTodos = async () => {
    dispatch(todosActions.setLoading(true));
    try {
      const todosFromServer = await getTodos();

      dispatch(todosActions.setTodos(todosFromServer));
    } catch {
      dispatch(todosActions.setError('There is a problem with loading todos'));
    } finally {
      dispatch(todosActions.setLoading(false));
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {loading ? <Loader /> : (
              <>
                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
