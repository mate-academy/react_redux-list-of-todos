import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const loadTodos = ((data: Todo[]) => dispatch(todosActions.load(data)));
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const [isLoading, setIsLoading] = useState(true);

  const getTodosFromServer = async () => {
    setIsLoading(true);
    try {
      const todosFromServer = await getTodos();

      loadTodos(todosFromServer);
    } catch {
      throw new Error('Todos have not been loaded');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const preparedQuery = filter.query.toLowerCase().trim();
      const queryCheck = todo.title.toLowerCase().includes(preparedQuery);

      switch (filter.status) {
        case 'active':
          return !todo.completed && queryCheck;

        case 'completed':
          return todo.completed && queryCheck;

        default:
          return queryCheck;
      }
    })
  ), [filter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter filter={filter} />
                </div>

                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    currentTodo={currentTodo}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal todo={currentTodo} />
      )}
    </>
  );
};
