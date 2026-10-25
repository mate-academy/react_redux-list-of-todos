/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { setCurrentTodo } from './features/currentTodo';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch (error) {
        console.error('something went wrong', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
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
              {loading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          onClose={() => {
            dispatch(setCurrentTodo(null));
          }}
        />
      )}
    </>
  );
};
