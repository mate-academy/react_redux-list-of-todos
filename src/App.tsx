/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { loading } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.setLoading(true));

    getTodos().then((data) => {
      dispatch(todosActions.setTodos(data));
    }).catch((err) => {
      dispatch(todosActions.setError(err.message));
    }).finally(() => {
      dispatch(todosActions.setLoading(false));
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
                ? (<Loader />)
                : (<TodoList />)}
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
