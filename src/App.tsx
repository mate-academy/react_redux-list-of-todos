/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as storeTodoAction } from './features/todos';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todosFS => setTodos(todosFS))
      .catch(() => {
        throw new Error('No todos on server!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useMemo(() => {
    dispatch(storeTodoAction.storeTodos(todos));
  }, [dispatch, todos]);

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
              {isLoading && <Loader />}

              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
