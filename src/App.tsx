import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';

import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/Hooks';

export const App = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    return getTodos()
      .then(data => dispatch({ type: 'todos/setTodos', payload: data }))
      .catch(err => console.error(err))
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

            <div className="block">
              {loading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && !loading && <TodoModal />}
    </>
  );
};
