import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/store';
import { useEffect } from 'react';
import { useAppDispatch } from './app/store';
import { setTodos } from '../features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos().then(todos => {
      dispatch(setTodos(todos));
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

      {useAppSelector(state => state.currentTodo) && <TodoModal />}
    </>
  );
};
