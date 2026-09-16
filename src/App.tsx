import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import React from 'react';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    getTodos().then(todos => {
      dispatch(todosSlice.actions.setTodos(todos));
      setLoader(false);
    });
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
              {!loader && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
