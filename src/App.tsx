/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const lowerQuery = query.toLowerCase();

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const getData = async () => {
    try {
      setIsLoader(true);
      const loadedData = await getTodos();

      dispatch(todosActions.setTodos(loadedData));
      setVisibleTodos(loadedData);
    } catch (error) {
      throw Error('Field to load todo data');
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const queryFiltering = useCallback(() => {
    setVisibleTodos((current) => [...current].filter((data) => {
      const lowerTitle = data.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    }));
  }, [query]);

  useEffect(() => {
    switch (status) {
      case 'active':
        setVisibleTodos([...todos].filter((data) => !data.completed));
        break;

      case 'completed':
        setVisibleTodos([...todos].filter((data) => data.completed));
        break;

      default:
        setVisibleTodos(todos);
        break;
    }

    queryFiltering();
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
              {isLoader ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} />
      )}
    </>
  );
};
