import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const [isLoading, setIsLoading] = useState(true);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const completed = useSelector((state: RootState) => state.filter.status);
  const query = useSelector((state: RootState) => state.filter.query);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        dispatch(actions.load(data));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (query !== '') {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (completed === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (completed === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    return filtered;
  }, [todos, query, completed]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter query={query} completed={completed} />
                </div>
                <div className="block">
                  <TodoList todos={filteredTodos} selectedTodo={selectedTodo} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} />}
    </>
  );
};
