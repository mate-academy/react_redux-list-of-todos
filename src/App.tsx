/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { todosSlice } from './features/todos';
import { filterSlice } from './features/filter';
import { Status } from './types/Status';
import { currentTodoSlice } from './features/currentTodo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector<RootState, Todo[]>(state => state.todos);
  const query = useSelector<RootState, string>(state => state.filter.query);
  const status = useSelector<RootState, Status>(state => state.filter.status);
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );

  const onSearch = (search: string) => {
    dispatch(filterSlice.actions.setQuery(search));
  };

  const filtration = (method: string) => {
    dispatch(
      filterSlice.actions.setStatus(method as 'all' | 'active' | 'completed'),
    );
  };

  const visibleTodos = useMemo(() => {
    let filtered = todos;

    if (status !== 'all') {
      filtered = filtered.filter(todo =>
        status === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, status, query]);

  const openModal = (t: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(t));
    setModalOpen(true);
  };

  const closeModal = () => {
    dispatch(currentTodoSlice.actions.clearCurrentTodo(null));
    setModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => dispatch(todosSlice.actions.setTodos(data)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={filtration}
                onSearch={onSearch}
                query={query}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} onShow={openModal} />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <TodoModal todo={currentTodo} onClose={closeModal} />}
    </>
  );
};
