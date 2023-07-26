import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { actions as todoActions } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTodo } = useAppSelector(state => state);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const loadTodos = async () => {
    setError(false);
    setLoading(true);

    try {
      const todosFromServer = await getTodos();

      dispatch(todoActions.add(todosFromServer));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
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
              {error && 'Error on loading data from server'}

              {!isLoading && !error
                ? (
                  <TodoList />
                )
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          todo={currentTodo}
        />
      )}
    </>
  );
};
