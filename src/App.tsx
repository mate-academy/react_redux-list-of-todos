/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  // const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleTodosFromServer = async () => {
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
    handleTodosFromServer();
  }, []);

  // console.log(todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
