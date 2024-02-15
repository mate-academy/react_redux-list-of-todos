/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todoActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isTodos = useAppSelector(state => state.todos.length > 0);
  const isSelectedTodos = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(
        todoActions.setTodos(todos),
      ));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isTodos ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>

              </>
            )}
          </div>
        </div>
      </div>

      {isSelectedTodos && (
        <TodoModal />
      )}
    </>
  );
};
