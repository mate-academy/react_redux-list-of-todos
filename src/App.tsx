import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const getTodosFromServer = async () => {
    try {
      setIsLoading(true);
      const todosFromServer = await getTodos();

      dispatch(todosActions.setTodos(todosFromServer));
    } catch (error) {
      throw new Error('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <div className="block">
              <TodoFilter />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
