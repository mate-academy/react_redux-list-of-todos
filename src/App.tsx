import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(state => state.todos.loadingStatus);
  const currentTodo = useAppSelector(state => state.currentTodo.todo);

  const handleTodosLoad = useCallback(async () => {
    dispatch(todosSlice.actions.setIsLoading('loading'));
    try {
      dispatch(todosSlice.actions.set(await getTodos()));
      dispatch(todosSlice.actions.setIsLoading('success'));
    } catch {
      dispatch(todosSlice.actions.setIsLoading('error'));
    }
  }, [dispatch]);

  useEffect(() => {
    handleTodosLoad();
  }, [handleTodosLoad]);

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
              {loadingStatus === 'loading' ? (
                <Loader />
              ) : loadingStatus === 'success' ? (
                <TodoList />
              ) : (
                <p className="has-text-danger">Something went wrong!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
