/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as actionsTodos } from './features/todos';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const { loading, todos } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionsTodos.setLoadig(true));

    getTodos()
      .then(todosFromServer => dispatch(actionsTodos.setTodos(todosFromServer)))
      .catch(error => dispatch(actionsTodos.setError(error)))
      .finally(() => dispatch(actionsTodos.setLoadig(false)));
  }, [dispatch]);

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
              {!loading && todos.length > 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
