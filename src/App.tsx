/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const set = (data: Todo[]) => dispatch(todosActions.setTodos(data));

  const loadData = async () => {
    try {
      setIsLoader(true);
      const data = await getTodos();

      set(data);
    } catch (error) {
      window.console.log('error = ', error);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isLoader && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>
              </>
            )}

            <div className="block">
              {isLoader && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
