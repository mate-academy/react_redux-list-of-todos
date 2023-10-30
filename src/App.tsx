/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppDispatch, useAppSelector } from './app/hooks';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { TodoPage } from './Pages/TodoPage';

import { actions } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const setAllTodos = (fetchedTodos: Todo[]) => dispatch(actions.setAllTodos(fetchedTodos));
  const setVisibleTodos = (fetchedTodos: Todo[]) => dispatch(actions.setVisibleTodos(fetchedTodos));
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const fetchedTodos = await getTodos();

      setAllTodos(fetchedTodos);
      setVisibleTodos(fetchedTodos);
    } finally {
      setIsLoading(false);
    }
  };

  const currentTodo = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {
              isLoading
                ? <Loader />
                : <TodoPage />
            }
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
