import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export function App() {
  const { currentTodo } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(response => dispatch(setTodos(response)))
      .finally(() => setLoading(false));
  }, []);

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

      {currentTodo && <TodoModal />}
    </>
  );
}
