/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { actions as TodoActions } from './features/todos';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((response) => {
        dispatch(TodoActions.SetTodo(response));
      });
  }, []);

  const filterTodos = (state: RootState) => {
    const { todos } = state;
    const { status, query } = state.filter;

    return todos.filter(todo => {
      const { title, completed } = todo;
      const filterTitle = title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (status) {
        case 'all':
          return filterTitle;
        case 'active':
          return filterTitle && !completed;
        case 'completed':
          return filterTitle && completed;
        default:
          return true;
      }
    });
  };

  const filteredTodos = useAppSelector(filterTodos);

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
              {!isLoading
                ? (<Loader />)
                : (<TodoList todos={filteredTodos} />)}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
