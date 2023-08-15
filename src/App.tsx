/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialStore = useAppSelector(state => state.todos.initialArray);
  const filteredStore = useAppSelector(state => state.todos.filteredArray);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!initialStore.length) {
      getTodos()
        .then((todos) => {
          dispatch(todosActions.set(todos));
        })
        .finally(() => setIsLoading(false));
    }
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
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    isLoading={isLoading}
                    todos={filteredStore}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          todos={filteredStore}
          todoId={currentTodo.id}
        />
      )}
    </>
  );
};
