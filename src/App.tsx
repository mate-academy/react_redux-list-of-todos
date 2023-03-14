import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { actions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const todosFetch = async () => {
      try {
        setIsLoading(true);
        const result = await getTodos();

        dispatch(actions.setTodos(result));
      } catch (error) {
        throw new Error(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    todosFetch();
  }, []);

  return (
    <>
      {isLoading ? <Loader />
        : (
          <div className="section">
            <div className="container">
              <div className="box">
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </div>
            </div>
          </div>

        )}
      {currentTodo
        && (
          <TodoModal />
        )}
    </>
  );
};
