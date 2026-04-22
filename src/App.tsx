import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { loadTodos } from './features/todos';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todos => {
        dispatch(loadTodos(todos));
      })
      .catch(() => {
        setErrorMessage('Не вдалося завантажити дані. Спробуйте пізніше.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {/* Вивід повідомлення про помилку */}
            {errorMessage && (
              <div className="notification is-danger is-light">
                <button
                  type="button"
                  className="delete"
                  onClick={() => setErrorMessage('')}
                  aria-label="close"
                />
                {errorMessage}
              </div>
            )}

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
