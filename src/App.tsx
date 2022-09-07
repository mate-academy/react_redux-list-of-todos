/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { CURRENT_TODOS_SELECTORS, TODOS_SELECTORS } from './app/selectors';
import { TODOS_ACTIONS } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const filteredTodos = useAppSelector(TODOS_SELECTORS.filteredTodos);
  const currentTodo = useAppSelector(CURRENT_TODOS_SELECTORS.currentTodo);

  useEffect(() => {
    dispatch(TODOS_ACTIONS.loadTodos);
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
              {filteredTodos.length === 0
                ? (
                  <Loader />
                ) : (
                  <TodoList todos={filteredTodos} />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
