import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
// import { init } from './features/todos';
import { getTodos } from './api';
import { actions } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  // useEffect(() => {
  //   dispatch(init());
  // }, []);

  useEffect(() => {
    dispatch(actions.setLoading(true));
    getTodos()
      .then(todos => {
        dispatch(actions.setTodos(todos));
      })
      .catch(error => {
        dispatch(actions.setError(error.message));
      })
      .finally(() => dispatch(actions.setLoading(false)));
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
      {currentTodo && <TodoModal />}
    </>
  );
};
