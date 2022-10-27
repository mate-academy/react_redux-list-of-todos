/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { RootState } from './app/store';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const currentTodo: Todo | null = useSelector<RootState, Todo | null>(state => state.currentTodo);
  const allTodos: Todo[] | [] = useSelector<RootState, Todo[] | []>(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos().then(fetchTodos => dispatch(todosActions.setAllTodos(fetchTodos)));
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
              {allTodos.length === 0
                ? <Loader />
                : (
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo?.userId && (
        <TodoModal />
      )}
    </>
  );
};
