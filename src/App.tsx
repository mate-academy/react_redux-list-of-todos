/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as actionsTodos } from './features/todos';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(gotTodos => {
        setAllTodos(gotTodos);
        dispatch(actionsTodos.setTodos(gotTodos));
      })
      .catch(() => new Error())
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter allTodos={allTodos} />
            </div>

            <div className="block">
              {isLoading ? (<Loader />) : (
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
