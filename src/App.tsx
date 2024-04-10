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
  const { loading } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const { todos } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(todosActions.setLoading(true));
    getTodos()
      .then(todosFromServer => dispatch(todosActions.setTodos(todosFromServer)))
      .catch(e => dispatch(todosActions.setError(e)))
      .finally(() => dispatch(todosActions.setLoading(false)));
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
              {loading && <Loader />}
              {todos && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
