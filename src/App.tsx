/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { Todo } from 'types/Todo';
import { actions as todosActions } from 'features/todos';

import { getTodos } from 'api';

import { Loader } from 'components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  // prettier-ignore
  const setTodos = (todosFromServer: Todo[]) => dispatch(
    todosActions.setTodos(todosFromServer),
  );

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(true);
    getTodos()
      .then(setTodos)
      .catch()
      .finally(() => setIsloading(false));
  }, []);

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

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
