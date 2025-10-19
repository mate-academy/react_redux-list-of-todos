import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, startLoading } from './features/todos';
import { getTodos } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(startLoading());
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
