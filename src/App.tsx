/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useAppSelector, useAppDispatch } from './app/hook';
import { todosSlice } from './features/todos';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);

  const selectedCondition = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(res => dispatch(todosSlice.actions.setTodos(res)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const visibleTodos = getFilteredTodos(todos, {
    query,
    selectedFilter: selectedCondition,
  });

  const isShow = !isLoading && !!todos.length;

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
              {isLoading && <Loader />}

              {isShow && <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
