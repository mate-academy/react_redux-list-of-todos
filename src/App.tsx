import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { useEffect } from 'react';
import { loadTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);

  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);

  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'active'
          ? !todo.completed
          : todo.completed;

    return matchesQuery && matchesStatus;
  });

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
              {filteredTodos.length === 0 ? (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              ) : (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
