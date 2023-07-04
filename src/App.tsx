/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(actions.setLoading(true));
    getTodos().then((data) => {
      dispatch(actions.setTodos(data));
    }).catch((err) => {
      dispatch(actions.setError(err.message));
    }).finally(() => {
      dispatch(actions.setLoading(false));
    });
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
              {loading
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
