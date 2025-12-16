import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppSelector, useDispatchSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const dispatch = useDispatchSelector();
  const [loading, setLoading] = useState(false);
  const modal = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getTodos();

      dispatch(todosSlice.actions.set(result));
      setLoading(false);
    })();
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
              {loading ? <Loader /> : <TodoList loading={loading} />}
            </div>
          </div>
        </div>
      </div>

      {modal && <TodoModal />}
    </>
  );
};
