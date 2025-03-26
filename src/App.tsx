import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { actions } from './features/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const dispatch = useDispatch();
  const currTodo = useSelector<RootState, Todo | null>(state => state.currTodo);

  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(res => dispatch(actions.set(res)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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
              {Loading ? <Loader /> : <TodoList isError={Error} />}
            </div>
          </div>
        </div>
      </div>
      {currTodo && <TodoModal />}
    </>
  );
};
