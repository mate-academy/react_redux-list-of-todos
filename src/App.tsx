/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { actions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadTodos = async () => {
    setIsLoading(true);

    try {
      let loadedTodos = await getTodos();

      switch (status) {
        case 'all':
          break;

        case 'active':
          loadedTodos = loadedTodos.filter(todo => !todo.completed);
          break;

        case 'completed':
          loadedTodos = loadedTodos.filter(todo => todo.completed);
          break;

        default:
          break;
      }

      const queryToLower = query.toLowerCase();

      loadedTodos = loadedTodos.filter(todo => {
        const todoTitleToLower = todo.title.toLowerCase();

        return todoTitleToLower.includes(queryToLower);
      });

      dispatch(actions.setTodos(loadedTodos));
    } catch (error) {
      throw new Error('Error loading todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [status, query]);

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
              {!isLoading && <TodoList />}

            </div>
          </div>
        </div>
      </div>

      { currentTodo && <TodoModal />}
    </>
  );
};
