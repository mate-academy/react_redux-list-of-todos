import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import {
  setTodos,
  setLoading,
  setFailed,
} from './features/todos';
import { AppDispatch } from './app/store';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLoading());
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .catch(() => {
        dispatch(setFailed());
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
              <Loader />
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
