import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, setTodosLoading } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.todos.isLoading);

  useEffect(() => {
    const loadTodos = async () => {
      dispatch(setTodosLoading(true));

      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } finally {
        dispatch(setTodosLoading(false));
      }
    };

    loadTodos();
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
              {isLoading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
