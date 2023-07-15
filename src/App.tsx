/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoModal } from './components/TodoModal';

const visibleTodos = (query: string, todos: Todo[], status: string) => {
  const formattedQuery = query.trim().toLowerCase();

  switch (status) {
    case Filter.Active:
      return todos.filter(
        todo => !todo.completed && todo.title.toLowerCase().includes(formattedQuery),
      );
    case Filter.Completed:
      return todos.filter(
        todo => todo.completed && todo.title.toLowerCase().includes(formattedQuery),
      );
    default:
      return todos.filter(
        todo => todo.title.toLowerCase().includes(formattedQuery),
      );
  }
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodoItems = visibleTodos(query, todos, status);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todoItems) => {
        dispatch(todosActions.set(todoItems));
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              {isLoading ? (<Loader />) : (
                <TodoList
                  todos={visibleTodoItems}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
