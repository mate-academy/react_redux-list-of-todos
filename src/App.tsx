import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { todosSlice } from './features/todos';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => dispatch(todosSlice.actions.setTodos(data)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (filter.status) {
          case Status.Active:
            return !todo.completed;
          case Status.Completed:
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(filter.query.toLowerCase()),
      );
  }, [todos, filter]);

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
              {!loading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
