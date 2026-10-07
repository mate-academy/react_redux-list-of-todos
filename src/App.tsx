import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { getTodos } from './api';
import { useCallback, useEffect } from 'react';

export const App = () => {
  const loading = useAppSelector(state => state.todos.loading);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { loadTodos } = todosSlice.actions;
  const dispatch = useAppDispatch();

  const loadingTodos = useCallback(async () => {
    try {
      const todos = await getTodos();

      dispatch(loadTodos(todos));
    } catch (error) {
      throw Error('');
    }
  }, [dispatch, loadTodos]);

  useEffect(() => {
    loadingTodos();
  }, [loadingTodos]);

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

      {selectedTodo && <TodoModal />}
    </>
  );
};
