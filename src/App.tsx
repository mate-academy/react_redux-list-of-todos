/* eslint-disable max-len */
import React, {
  useEffect,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getVisibleTodos } from './helper';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todosRedux = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todosRedux, query, status)
  ), [query, status, todosRedux]);

  async function fetchTodos() {
    const todosFromServer = await getTodos();

    dispatch(todosActions.setTodos(todosFromServer));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                queryValue={query}
                filterValue={status}
              />
            </div>

            <div className="block">
              {todosRedux.length ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={currentTodo?.id || 0}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          todo={currentTodo}
        />
      )}
    </>
  );
};
