import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .finally(() => setLoading(false));
  }, []);

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

      <TodoModal />
    </>
  );
};
