import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { useAppDispatch } from './app/hooks';
import { getTodos } from './api';
import { actions as todoActions } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasReceivedTodos, setHasReceivedTodos] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();

        dispatch(todoActions.setTodos(todos));
        setHasReceivedTodos(true);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
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
              {isLoading && <Loader />}

              {hasError && (
                <p className="notification is-danger">
                  Unable to load todos
                </p>
              )}

              {hasReceivedTodos && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {!!currentTodo && <TodoModal />}
    </>
  );
};
