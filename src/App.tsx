import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const loadTodos = useCallback(
    async () => {
      try {
        setTodosFromServer(await getTodos());
        setIsLoaded(true);
      } catch {
        throw new Error('Loading is falied');
      }
    }, [],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    dispatch(todosActions.getVisibleTodos(todosFromServer, filter));
  }, [filter, todosFromServer]);

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
              {!isLoaded
                && <Loader />}
              {isLoaded
              && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo
      && <TodoModal />}
    </>
  );
};
