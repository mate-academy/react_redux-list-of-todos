import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos, getUser } from './api';
import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from './app/hooks';

import { setIsLoading, setTodos, setIsError } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  console.log(todos);

  useEffect(() => {
    dispatch(setIsLoading(true));
    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      // .catch(() => dispatch(setIsError('error')))
      .finally(() => dispatch(setIsLoading(false)));
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
