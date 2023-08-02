/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const lowerQuery = query.toLowerCase();

  const getData = async () => {
    try {
      setIsLoader(true);
      let loadedData = await getTodos();

      switch (status) {
        case 'all':
          break;

        case 'active':
          loadedData = [...loadedData].filter((data) => !data.completed);
          break;

        case 'completed':
          loadedData = [...loadedData].filter((data) => data.completed);
          break;

        default:
          break;
      }

      if (query.length) {
        loadedData = [...loadedData].filter((data) => {
          const lowerTitle = data.title.toLowerCase();

          return lowerTitle.includes(lowerQuery);
        });
      }

      dispatch(todosActions.setTodos(loadedData));
    } catch (error) {
      throw Error('Field to load todo data');
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getData();
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
                <TodoList todos={todos} />
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
