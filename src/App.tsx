/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // const { todos } = useAppSelector(state => state.todos);
  const { loader } = useAppSelector(state => state.todos);
  // const { error } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(todosActions.setLoader(true));
    getTodos()
      .then(todosFromServer => dispatch(todosActions.setTodos(todosFromServer)))
      // eslint-disable-next-line
      .catch(error => todosActions.setError(error))
      .finally(() => dispatch(todosActions.setLoader(false)));
  }, [dispatch]);

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
              {loader === true ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
