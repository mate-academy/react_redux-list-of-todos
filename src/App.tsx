import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(getTodo => {
        dispatch(setTodos(getTodo));
      })
      .finally(() => setLoader(false));
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
              {loader && <Loader />}
              {!loader && !!todos.length && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
