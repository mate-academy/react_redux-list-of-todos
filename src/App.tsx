import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const { currentTodo } = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList />
              </div>
            </div>
          )}
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
