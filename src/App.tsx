/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './features/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { RootState } from './app/store';

export const App = () => {
  const selectedTodos = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((response: Todo[]) => {
        dispatch(setTodos(response));
      })
      .catch(console.error)
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
              {loading ? <Loader /> : null}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {selectedTodos ? <TodoModal /> : null}
    </>
  );
};
