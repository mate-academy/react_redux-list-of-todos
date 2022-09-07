/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { AppDispatch, RootState } from './app/store';
import { getTodos } from './api';
import { actions as TodosActions } from './features/todos';
import { Todo } from './types/Todo';
import './App.scss';
import { Filter } from './features/filter';

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedTodo: Todo | null = useSelector((state: RootState) => state.currentTodo);
  const prepTodos: Todo[] = useSelector((state: RootState) => {
    const { query, status } = state.filter;
    const { todos } = state;

    return todos.filter(todo => {
      const includeSearch = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (status) {
        case Filter.ACTIVE:
          return includeSearch && todo.completed === false;

        case Filter.COMPLETED:
          return includeSearch && todo.completed === true;

        case Filter.ALL:
          return includeSearch;

        default:
          return todo;
      }
    });
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((res) => {
        dispatch(TodosActions.set(res));
        setIsLoading(false);
      });
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
              {isLoading
                ? <Loader />
                : <TodoList todos={prepTodos} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} />}
    </>
  );
};
