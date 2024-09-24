/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';

import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';

export const App = () => {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);
  const todos = useSelector((state: RootState) => state.todos.todos);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await getTodos();

        dispatch(setTodos(response));
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const noTodos = !todos.length;
  const modalIsVisible = !!currentTodo;

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
              {isLoading ? <Loader /> : !noTodos ? <TodoList /> : null}
            </div>
          </div>
        </div>
      </div>

      {modalIsVisible && <TodoModal />}
    </>
  );
};
