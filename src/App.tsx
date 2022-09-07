/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodosActionCreator, setTodosErrorAction, setTodosIsLoadingAction } from './features/todos';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.todos.todosIsLoading);
  const selectedTodo = useAppSelector((state: RootState) => state.currentTodo.todo);

  useEffect(() => {
    dispatch(setTodosIsLoadingAction(true));
    getTodos()
      .then(gottenTodos => dispatch(setTodosActionCreator(gottenTodos)))
      .catch((e) => dispatch(setTodosErrorAction(e)))
      .finally(() => dispatch(setTodosIsLoadingAction(false)));
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
              {isLoading
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
