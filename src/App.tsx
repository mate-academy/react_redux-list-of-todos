/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const isSelected = currentTodo !== null;

  const loadTodos = async () => {
    setIsLoading(true);
    let allTodos;

    try {
      allTodos = await getTodos();
    } catch (error) {
      throw new Error('Data loading error');
    }

    switch (status) {
      case 'all':
        break;

      case 'active':
        allTodos = allTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        allTodos = allTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    const lowerQuery = query.toLowerCase();

    allTodos = allTodos.filter((todo) => {
      const lowerTitle = todo.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });

    dispatch(todosActions.setTodos(allTodos));
    setIsLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, [query, status]);

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
              {isLoading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {isSelected && <TodoModal />}
    </>
  );
};
