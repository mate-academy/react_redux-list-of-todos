/* eslint-disable no-console */

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { setLoading, setTodos } from './features/todos';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from './types/Todo';
import { RootState } from './app/store';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.todos.loading);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading(true));

      try {
        const data: Todo[] = await getTodos();

        dispatch(setTodos(data));
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTodos();
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

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
