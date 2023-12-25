import { FC, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: FC = () => {
  const { todos, isLoading, error } = useAppSelector(state => state.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.setLoading(true));

    getTodos()
      .then(todosFromServer => dispatch(todosActions.setTodos(todosFromServer)))
      .catch((err) => dispatch(todosActions.setError(err)))
      .finally(() => dispatch(todosActions.setLoading(false)));
  }, [dispatch]);

  const hasError = !isLoading && !!error.length;
  const hasTodoList = !isLoading && !error.length && !!todos.length;

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
              {isLoading && (<Loader />)}
              {hasError && (<p>Something went wrong</p>)}
              {hasTodoList && (<TodoList />)}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
