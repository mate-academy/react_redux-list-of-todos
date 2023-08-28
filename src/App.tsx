/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as TodosActions } from './features/todos';
import { todosFilterdByQuery, todosFilteredByStatus } from './helpers/helpers';

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
      setIsLoading(false);

      let filteredTodos = todosFilteredByStatus(allTodos, status);

      filteredTodos = todosFilterdByQuery(filteredTodos, query);

      dispatch(TodosActions.setTodos(filteredTodos));
    } catch (error) {
      throw new Error('Failed to load todos');
    }
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
              {isLoading
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {isSelected && <TodoModal />}
    </>
  );
};
