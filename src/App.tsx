import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setLoader, setTodos } from './features/todos';
import { TodoList, Loader, TodoFilter, TodoModal } from './components';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loader } = useSelector((state: RootState) => state.todos);
  const { currentTodo } = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    dispatch(setLoader(true));
    getTodos()
      .then(todosFromApi => {
        dispatch(setTodos(todosFromApi));
      })
      .finally(() => dispatch(setLoader(false)));
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
            <div className="block">{loader ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
