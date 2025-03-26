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
  const currTodo = useSelector<RootState>(
    state => state.currTodo,
  ) as Todo | null;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(res => dispatch(actions.set(res as Todo[])))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
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
              {isLoading ? <Loader /> : <TodoList isError={isError} />}
            </div>
          </div>
        </div>
      </div>
      {currTodo && <TodoModal />}
      {/* <TodoModal /> */}
    </>
  );
};
