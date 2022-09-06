/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { RootState } from './app/store';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { todosActions } from './features/todos';
import { loaderActions } from './features/loading';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const currTodo = useSelector((state: RootState) => state.currentTodo);
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(loaderActions.setTodosLoading());
    getTodos()
      .then((todos: Todo[]) => dispatch(todosActions.setTodo(todos)))
      .finally(() => dispatch(loaderActions.removeTodosLoading()));
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
              {loading.todosLoading
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currTodo && <TodoModal />}
    </>
  );
};
