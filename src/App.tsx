import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, setLoading } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.todos.loading);
  const currentTodo = useAppSelector(state => state.currentTodo.currentItem);

  useEffect(() => {
    dispatch(setLoading(true));
    getTodos().then(todosFromApi => {
      dispatch(setTodos(todosFromApi));
      dispatch(setLoading(false));
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
              {loading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
