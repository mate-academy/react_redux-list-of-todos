/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { actions } from './features/todos';
import { useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isTodoLoading, setIsTodoLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const curentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(actions.setTodos(data)))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsTodoLoading(false));
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
            {hasError && !isTodoLoading && <p>Oops, something went wrong</p>}
            {!hasError && isTodoLoading && <Loader />}

            {!hasError && !isTodoLoading && (
              <div className="block">
                <TodoList />
              </div>
            )}
          </div>
        </div>
      </div>

      {curentTodo && <TodoModal />}
    </>
  );
};
