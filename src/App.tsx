/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasSelectedTodo = useAppSelector(state => state.currentTodo !== null);
  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    getTodos().then(todosArr => dispatch(
      todosActions.setTodos(todosArr),
    ));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!todos.length
              ? (<Loader />
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

      {hasSelectedTodo && <TodoModal />}

    </>
  );
};
