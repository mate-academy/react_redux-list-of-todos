import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { actions } from './features/todos';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const todos: Todo[] = useAppSelector((state) => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data) => dispatch(actions.geAllTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const shouldDisplayTodoList = !isLoading && todos.length > 0;

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
              {isLoading && <Loader />}

              {shouldDisplayTodoList && (
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
