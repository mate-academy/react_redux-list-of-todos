import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { set, setError, setLoading } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const { loading, error } = useAppSelector(states => states.todos);
  const currentTodo = useAppSelector(state => state.currentTodo.todo);

  useEffect(() => {
    dispatch(setLoading(true));
    getTodos()
      .then(todosFromServer => {
        dispatch(set(todosFromServer));
      })
      .catch(() => {
        dispatch(setError('Something went wrong, try again later.'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
