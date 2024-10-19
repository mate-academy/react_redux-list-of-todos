import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(() =>
        setHasError('There are no todos matching current filter criteria'),
      )
      .finally(() => setLoading(false));
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
              <TodoList loading={loading} hasError={hasError} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
