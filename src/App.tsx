/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTodo, todos, filter } = useAppSelector(store => store);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(actions.setTodos(todosFromServer));
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const filteredTodos = getFilteredTodos(todos, filter);

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
              {loading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
