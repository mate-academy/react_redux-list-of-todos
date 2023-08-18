import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortingStatus } from './types/SortingStatus';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

function filterTodos(todos: Todo[], sortingStatus: string, query: string) {
  const serachingQuery = query.trim().toLowerCase();
  const todoWithQuery = todos.filter(todo => (
    todo.title.toLowerCase().includes(serachingQuery)
  ));

  return todoWithQuery.filter(todo => {
    switch (sortingStatus) {
      case SortingStatus.Active:
        return !todo.completed;

      case SortingStatus.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, status, query);
  }, [todos, status, query]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(fetchedTodos => dispatch(todosActions.setTodos(fetchedTodos)))
      .then(() => setIsLoading(false));
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
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={filteredTodos}
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
