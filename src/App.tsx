/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(currTodos => dispatch(actions.setTodos(currTodos)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {
              loading ? (
                <Loader />
              ) : (
                <>
                  <h1 className="title">Todos:</h1>

                  <div className="block">
                    <TodoFilter />
                  </div>

                  <div className="block">
                    <TodoList todos={todos} />
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
