import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { Status } from './types/Status';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(todosSlice.actions.setTodos(data)))
      .catch(() => {
        throw new Error();
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(
    e =>
      e.title.toLowerCase().includes(query.toLowerCase().trim()) ||
      String(e.id).includes(query.toLowerCase().trim()),
  );

  const getFilteredTodos = () => {
    switch (status) {
      case Status.Active:
        return filteredTodos.filter(todo => !todo.completed);

      case Status.Completed:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  const visibleList = getFilteredTodos();

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
              <TodoList loading={loading} todos={visibleList} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
