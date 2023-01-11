/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.todos);
  const currentTodos = useAppSelector(state => state.currentTodo);

  const fetchTodos = async () => {
    dispatch(actions.setLoading(true));
    try {
      const todosFetched = await getTodos();

      dispatch(actions.setTodos(todosFetched));
    } catch {
      dispatch(actions.setError('There is a problem with loading todos'));
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  useEffect(() => {
    fetchTodos();
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

            {loading
              ? <Loader />
              : (
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

      {currentTodos && <TodoModal />}
    </>
  );
};
