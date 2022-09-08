/* eslint-disable max-len */
import React, { useEffect } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodosApi } from './api';
import { TODOS_ACTIONS_CREATOR } from './features/todos';
import { SELECTORS } from './selectors/selectors';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(SELECTORS.currentTodoSelector);
  const { isLoading } = useAppSelector(SELECTORS.todosSelector);

  useEffect(() => {
    dispatch(TODOS_ACTIONS_CREATOR.setIsLoading(true));

    TodosApi.getTodos()
      .then(todosFS => dispatch(TODOS_ACTIONS_CREATOR.set(todosFS)))
      .catch()
      .finally(() => dispatch(TODOS_ACTIONS_CREATOR.setIsLoading(false)));
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
              {isLoading
                ? <Loader />
                : (
                  <TodoList />
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
