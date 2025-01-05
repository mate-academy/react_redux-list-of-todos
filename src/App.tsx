import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hook';
import { RootState } from './app/store';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status: selectFilter } = useAppSelector(
    (state: RootState) => state.filter,
  );

  const todos = useAppSelector((state: RootState) => state.todos);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const loadedTodos = await getTodos();

        dispatch(setTodos(loadedTodos));
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  const filteredTodos = todos
    .filter(todo => {
      if (selectFilter === 'active') {
        return !todo.completed;
      }

      if (selectFilter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => {
      const isQuery = query.toLowerCase().trim();

      if (!isQuery) {
        return true;
      }

      return todo.title.toLowerCase().includes(isQuery);
    });

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
              {!isLoading && todos.length > 0 && (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
