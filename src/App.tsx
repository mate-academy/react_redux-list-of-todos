import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getTodos } from './api';
import { setTodos, setLoading } from './features/todos';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodos);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.todos.loading);

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
            {loading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
