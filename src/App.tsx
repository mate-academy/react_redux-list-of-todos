/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { actions as todoActions } from './features/todos';
import { Status } from './types/Status';
import { useDispatch } from 'react-redux';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query } = useAppSelector(state => state.filter);
  const { filter } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then((todosLoad: Todo[]) => {
        dispatch(todoActions.setTodos(todosLoad));
      })
      .finally(() => {
        setLoader(false);
      });
  }, [dispatch]);

  const getFilteredTodos = (
    items: Todo[],
    filterParams: Status,
    queryParams: string,
  ) => {
    return items
      .filter(todo =>
        todo.title.toLowerCase().includes(queryParams.trim().toLowerCase()),
      )
      .filter(({ completed }) => {
        switch (filterParams) {
          case Status.Active:
            return !completed;

          case Status.Completed:
            return completed;

          default:
            return items;
        }
      });
  };

  const filteredTodos = getFilteredTodos(todos, filter, query);

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
              {loader ? <Loader /> : <TodoList filteredTodos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
