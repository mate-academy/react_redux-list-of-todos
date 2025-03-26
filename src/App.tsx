import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from './types/Todo';
import { RootState } from './app/store';
import { actions } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentTodo = useSelector<RootState>(
    state => state.currentTodo,
  ) as Todo | null;
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(res => dispatch(actions.set(res as Todo[])))
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setLoading(false);
      });
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
              {loading ? <Loader /> : <TodoList errorMessage={errorMessage} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
