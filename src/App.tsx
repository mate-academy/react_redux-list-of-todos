/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { Todo } from './types/Todo';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();
  const set = (todosFromServer: Todo[]) => (
    dispatch(todosActions.set(todosFromServer))
  );

  const isLoaded = useMemo((() => todos.length > 0), [todos]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos: Todo[] = await getTodos();

        set(fetchedTodos);
      } catch (error) {
        throw new Error();
      }
    };

    fetchTodos();
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
              {isLoaded
                ? <TodoList />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo
        && <TodoModal />}
    </>
  );
};
