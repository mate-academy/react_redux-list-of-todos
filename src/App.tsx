/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { AppDispatch, RootState } from './app/store';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { setQuery, setStatus } from './features/filter';
import { setTodos } from './features/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const chosenFilter = useSelector((state: RootState) => state.filter.status);
  const searchBar = useSelector((state: RootState) => state.filter.query);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(loadedTodos => dispatch(setTodos(loadedTodos)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const filteredTodos = todos
    .filter(todo => {
      if (chosenFilter === 'active') {
        return !todo.completed;
      }

      if (chosenFilter === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(searchBar.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                activeSearch={searchBar}
                onSearchChange={value => dispatch(setQuery(value))}
                chosenFilter={chosenFilter}
                onFilterChange={value => dispatch(setStatus(value))}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
