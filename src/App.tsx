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
import { Todo } from './types/Todo';

type FilterType = 'all' | 'active' | 'completed';

const filterForTodos = (
  todos: Todo[],
  filterData: { query: string; status: FilterType },
) => {
  return todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filterData.query.toLowerCase());
    const matchesStatus =
      filterData.status === 'all' ||
      (filterData.status === 'completed' && todo.completed) ||
      (filterData.status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });
};

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(store => store.todos);
  const filterData = useAppSelector(store => store.filter);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => dispatch(todosActions.set(todosFromServer)))
      .finally(() => setIsLoaded(true));
  }, [dispatch]);

  const filteredTodos = filterForTodos(todos, filterData);

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
              {!isLoaded && <Loader />}
              {isLoaded && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
