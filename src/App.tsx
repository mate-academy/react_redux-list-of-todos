import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getPreparedTodos } from './utils/todos';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const inputQuery = useAppSelector(state => state.filter.query);
  const selectQuery = useAppSelector(state => state.filter.status);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const preparedTodos = getPreparedTodos(todos, { inputQuery, selectQuery });

  useEffect(() => {
    getTodos().then(todosFromServer => {
      dispatch(actions.setTodos(todosFromServer));
      setIsLoading(false);
    });
  }, [dispatch]);

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
              {/* eslint-disable-next-line prettier/prettier */}
              {
                !isLoading
                  ? <TodoList todos={preparedTodos} />
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} />}
    </>
  );
};
