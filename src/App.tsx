/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { actions as todosActions } from './features/todos';
import { actions as currentTodoActions } from './features/currentTodo';
import { filterTodos } from './utils/functions';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);

  const visibleTodos: Todo[] = filterTodos(todos, filter);

  useEffect(() => {
    getTodos().then((data) => {
      dispatch(todosActions.set(data));
    })
      .finally(() => setIsLoading(false));
  }, []);

  const removeCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

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
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo
        && (
          <TodoModal
            todo={currentTodo}
            onClose={removeCurrentTodo}
          />
        )}
    </>
  );
};
