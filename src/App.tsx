import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { downloadTodos } from './features/todos';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => dispatch(downloadTodos(data)))
      .catch()
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading && <Loader />}
            {!loading && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList setIsActive={setIsActive} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isActive && <TodoModal setIsActive={setIsActive} />}
    </>
  );
};
