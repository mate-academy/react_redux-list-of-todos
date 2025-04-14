import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const preparedTodos = useMemo(() => {
    switch (filter.status) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter.status]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => dispatch(todosSlice.actions.setTodos(data)))
      .catch(() => {
        throw new Error('Something went wrong, while loading todos');
      })
      .finally(() => setIsLoading(false));
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
              {isLoading ? <Loader /> : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
