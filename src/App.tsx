/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { RootState } from './app/store';
import { getTodos } from './api';
import { actions as initialActions } from './features/initialTodos';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const initialStore = useSelector((state: RootState) => state.initialTodos);
  const filteredStore = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (initialStore.length === 0) {
      getTodos()
        .then((todos) => {
          dispatch(initialActions.set(todos));
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
