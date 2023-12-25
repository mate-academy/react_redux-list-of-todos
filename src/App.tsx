/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { filterTodos } from './components/utils/filterTodos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((data) => {
        dispatch(todosActions.setTodos(data));
      })
      .catch(() => {
        throw new Error('Error');
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTodos = filterTodos(todos, filter);

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
              {loading ? (<Loader />
              ) : (
                <TodoList todos={filteredTodos} />
              )}
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
