import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as setTodosActions } from './features/todos';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => dispatch(
        setTodosActions.loadTodos(todosFromServer),
      ))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {isLoading && <Loader />}

            {todos.length > 0
              && (
                <>
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

      {currentTodo && <TodoModal />}
    </>
  );
};
