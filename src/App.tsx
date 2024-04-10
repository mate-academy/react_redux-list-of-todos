/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Loader } from './components/Loader';
import { filterTodos } from './utils/filterTodos';
import { TodoModal } from './components/TodoModal';
import { actions as currentTodoActions } from './features/currentTodo';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { filter, currentTodo, todos } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const filteredTodos = filterTodos(todos, filter);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => dispatch(todosActions.set(todosFromServer)))
      .finally(() => setIsLoading(false));
  }, [dispatch, setIsLoading]);

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
              {isLoading ? (
                <Loader />
              ) : !filteredTodos.length ? (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              ) : (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          onClose={() => dispatch(currentTodoActions.removeTodo())}
        />
      )}
    </>
  );
};
