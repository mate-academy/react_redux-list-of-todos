/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setTodos = (todosArr: Todo[]) =>
    dispatch(actionsTodos.setTodos(todosArr));
  const { status, query } = useAppSelector(state => state.filter);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (status) {
        case Filters.Active:
          return (
            !todo.completed &&
            todo.title.toLowerCase().includes(query.toLowerCase())
          );
        case Filters.Completed:
          return (
            todo.completed &&
            todo.title.toLowerCase().includes(query.toLowerCase())
          );
        case Filters.All:
        default:
          return todo.title.toLowerCase().includes(query.toLowerCase());
      }
    });
  }, [todos, status, query, setTodos]);

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
              {isLoading ? <Loader /> : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
