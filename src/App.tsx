/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { prepareTodos } from './utils/filterTodos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [hasLoadingError, setLoadingError] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  // let todos: Todo[] = [];

  const getTodosFromServer = async () => {
    setLoadingError(true);
    try {
      const todosFromServer = await getTodos();

      dispatch(actions.setTodos(todosFromServer));
      setLoadingError(false);
    } catch (error) {
      setLoadingError(true);
    } finally {
      setLoadingError(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = useMemo(() => {
    return prepareTodos(query, status, todos);
  }, [query, status, todos]);

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
              {!hasLoadingError
                ? <TodoList todos={visibleTodos} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}

      {/* <TodoModal /> */}
    </>
  );
};
