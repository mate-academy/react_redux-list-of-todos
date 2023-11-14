/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as TodosActions } from './features/todos';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todos) => dispatch(TodosActions.add(todos)))
      .catch(error => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {isLoading && (
              <Loader />
            )}
            <div className="block">
              <TodoFilter />
            </div>

            {!errorMessage && (
              <div className="block">
                <TodoList />
              </div>
            )}

          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
