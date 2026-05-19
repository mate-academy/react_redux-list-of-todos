import { useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { setLoading } from './features/loading';
import { getTodos } from './api';
import { Loader } from './components/Loader/Loader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal/TodoModal';

export const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.loading);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading(true));
      try {
        const todosFromApi = await getTodos();

        dispatch(setTodos(todosFromApi));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Todo List</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          <TodoFilter />
          <TodoList />
          <TodoModal />
        </>
      )}
    </div>
  );
};
