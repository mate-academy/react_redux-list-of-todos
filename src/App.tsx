/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export function checkQuery(query:string, content:string) {
  return (content.toLowerCase())
    .includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setIsLoading(true);
    dispatch(actions.add(todosFromServer));
  };

  useEffect(() => {
    loadTodos();
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
              {
                !isLoading
                  ? <Loader />
                  : (
                    <TodoList />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
