import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setLoading, setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(setLoading(true));

    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .finally(() => dispatch(setLoading(false)));
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
              {isLoading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {Boolean(currentTodo) && <TodoModal />}
    </>
  );
};
