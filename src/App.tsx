import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { actions: todosActions } = todosSlice;

  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState(false);

  const setTodos = useCallback(
    (todos: Todo[]) => dispatch(todosActions.set(todos)),
    [dispatch, todosActions],
  );

  // RETRIEVE TODO LIST ON PAGE LOAD
  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
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
              {!loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
