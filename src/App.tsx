import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppSelector } from './app/hook';

export const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(db => dispatch(setTodos(db)))
      .finally(() => setLoading(false));
  }, [currentTodo]);

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
