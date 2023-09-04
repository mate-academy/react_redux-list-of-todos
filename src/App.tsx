/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const setTodosFromServer = (loadedTodos: Todo[]) => dispatch(todosActions.setTodos(loadedTodos));

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer);
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
              {todos.length ? (
                <TodoList />
              ) : <Loader />}
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
