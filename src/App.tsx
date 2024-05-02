/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Todo } from './types/Todo';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const todos = useSelector<RootState, Todo[]>(state => state.todos);
  const currentTodo = useSelector<RootState>(state => state.currentTodo);
  const dispatch = useDispatch();

  const add = (items: Todo[]) => dispatch(todosActions.add(items));

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(response => {
        add(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              {isLoading && <Loader />}
              {!!todos.length && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
