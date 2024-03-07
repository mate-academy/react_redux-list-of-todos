/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todoActions } from './features/currentTodo';
import { actions as filterActions } from './features/filter';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filterBy = useAppSelector(state => state.filter);

  const setTodo = (item: Todo) => dispatch(todoActions.setTodo(item));
  const removeTodo = () => dispatch(todoActions.removeTodo());

  const filterAll = () => dispatch(filterActions.filterAll());
  const filterActive = () => dispatch(filterActions.filterActive());
  const filterCompleted = () => dispatch(filterActions.filterCompleted());
  const filterQuery = (value: string) => dispatch(filterActions.filterQuery(value));

  useEffect(() => {
    setLoadingTodos(true);

    getTodos().then((items: Todo[]) => {
      dispatch(todosActions.set(items));
      setLoadingTodos(false);
    });
  }, [dispatch]);

  const handlefilterParChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value as Status) {
      case 'completed':
        return filterCompleted();
      case 'active':
        return filterActive();
      default:
        return filterAll();
    }
  };

  const handleQuerryChange = (event: React.ChangeEvent<HTMLInputElement>) => filterQuery(event.target.value);

  const clearQuerryFild = () => {
    filterQuery('');
    filterAll();
  };

  const filtredTodos = todos
    .filter(todo => {
      switch (filterBy.status) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => {
      if (filterBy.query) {
        const filterParam = filterBy.query.toLowerCase();

        return todo.title.toLowerCase().includes(filterParam);
      }

      return true;
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterParam={filterBy.status}
                changeParams={handlefilterParChange}
                query={filterBy.query}
                queryChange={handleQuerryChange}
                deletequerry={clearQuerryFild}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filtredTodos}
                  selectedTodo={selectedTodo}
                  changeSelectedTodo={(item: Todo) => setTodo(item)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          clearsetSelectedTodo={() => removeTodo()}
        />
      )}
    </>
  );
};
