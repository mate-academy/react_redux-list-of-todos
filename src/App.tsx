import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';

import { todosSlice } from './features/todos';
import { loaderSlice } from './features/loader';
import { useAppSelector } from './hooks/hooks';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector(state => state.loading.loading);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(loaderSlice.actions.setLoading(true));
    getTodos().then(todos => {
      dispatch(todosSlice.actions.addTodos(todos));
      dispatch(loaderSlice.actions.setLoading(false));
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
              {loading && !currentTodo && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
