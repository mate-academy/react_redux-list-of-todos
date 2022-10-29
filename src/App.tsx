/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { actions as todosActions } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const currentTodo: Todo | null = useAppSelector<Todo | null>(state => state.currentTodo);
  const allTodos: Todo[] | [] = useAppSelector<Todo[] | []>(state => state.todos);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(fetchTodos => {
        dispatch(todosActions.setAllTodos(fetchTodos));
      })
      .finally(() => setIsLoading(false));
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
              {isLoading
                ? <Loader />
                : (
                  <>
                    {!!allTodos.length && !isLoading && (
                      <TodoList />
                    )}

                    {!isLoading && !allTodos.length && (
                      'There are no todos on server or other error'
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo?.userId && (
        <TodoModal />
      )}
    </>
  );
};
