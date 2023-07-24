import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { StatusFilter } from './types/StatusFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as allTodoActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const allTodos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterStatus = useAppSelector(state => state.filter);

  const dispatchTodo = useAppDispatch();

  const getTodo = (todos: Todo[]) => dispatchTodo(
    allTodoActions.getTodos(todos),
  );

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(todosFromServer => {
      getTodo(todosFromServer);
    })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = allTodos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().trim()
      .includes(filterStatus.query.toLowerCase().trim());

    switch (filterStatus.status) {
      case StatusFilter.All:
        return todo && matchesQuery;

      case StatusFilter.COMPLETED:
        return todo.completed && matchesQuery;

      case StatusFilter.ACTIVE:
        return !todo.completed && matchesQuery;

      default:
        throw new Error(`Wrong filter, ${filterStatus.status} is not defined`);
    }
  });

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
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                  />
                )}
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
