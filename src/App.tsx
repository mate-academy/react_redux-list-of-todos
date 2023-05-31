import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const loadTodos = (
    todosFromServer: Todo[],
  ) => dispatch(todosActions.loadTodos(todosFromServer));

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      loadTodos(todosFromServer);
    } catch {
      throw new Error('Error! Unable to upload todos!');
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <>
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                {todos.length ? (
                  <TodoList />
                ) : (
                  <Loader />
                )}
              </div>
            </>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
