import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { todosSlice } from './features/todos';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const currentTodo = useSelector<RootState>(state => state.currentTodo);
  const dispatch = useDispatch<AppDispatch>();
  const setTodos = (todos: Todo[]) =>
    dispatch(todosSlice.actions.setTodos(todos));

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setError('Something went wrong');
      })
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

            <div className="block">{loading && !error ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
