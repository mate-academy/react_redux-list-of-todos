/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { filterSlice } from './features/filter';
import { currentTodoSlice } from './features/currentTodo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const setTodos = (items: Todo[]) => {
    dispatch(todosSlice.actions.setTodos(items));
  };

  const setQuery = (q: string) => {
    dispatch(filterSlice.actions.setQuery(q));
  };

  const setStatus = (s: Status) => {
    dispatch(filterSlice.actions.setStatus(s));
  };

  const setCurrentTodo = (t: Todo | null) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(t));
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(t =>
        status === 'all'
          ? true
          : status === 'completed'
            ? t.completed
            : !t.completed,
      )
      .filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                status={status}
                onChangeStatus={setStatus}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && visibleTodos.length > 0 && (
                <TodoList
                  selectedTodo={currentTodo}
                  todos={visibleTodos}
                  onSelectTodo={setCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} onSelectTodo={setCurrentTodo} />
      )}
    </>
  );
};
