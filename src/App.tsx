/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  // async function loadTodosFromServer() {
  //   const getTodosFromServer = await getTodos();

  //   setTodos(getTodosFromServer);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   loadTodosFromServer();
  // }, []);

  const getFilteredTodos = useMemo(() => {
    const toFilter = todos.filter((item) => {
      const queryToLowerCase = query.toLowerCase();
      const filterInput = item.title.toLowerCase().includes(queryToLowerCase);

      switch (status) {
        case 'active':
          return !item.completed && filterInput;
        case 'completed':
          return item.completed && filterInput;
        default:
          return filterInput;
      }
    });

    return toFilter;
  }, [status, todos, query]);

  async function loadTodosFromServer() {
    const getTodosFromServer = await getTodos();

    dispatch(actions.fetchData(getTodosFromServer));
    setIsLoading(false);
  }

  useEffect(() => {
    loadTodosFromServer();
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
              {isLoading && (
                <Loader />
              )}

              <TodoList
                todos={getFilteredTodos}
              />
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
