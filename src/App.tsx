import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const setTodos = (todos: Todo[]) =>
    dispatch(todosSlice.actions.setTodos(todos));

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && !error ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </section>

      {currentTodo && <TodoModal />}
    </>
  );
};
