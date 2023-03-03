import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodosFromServer } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos/actions';
import { getTodosFromStore } from './features/todos/selectors';
import { getCurrentTodo } from './features/currentTodo/selectors';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getTodosFromStore);
  const selectedTodo = useAppSelector(getCurrentTodo);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodosFromServer().then((todosFromServer) => {
      setIsLoading(false);

      dispatch(todosActions.setTodos(todosFromServer));
    });
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={todos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} />
      )}
    </>
  );
};
