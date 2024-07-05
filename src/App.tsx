import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setError, setLoading, setTodos } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const { todos, error, loading } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(setLoading(true));

    getTodos()
      .then(todosFromServer => dispatch(setTodos(todosFromServer)))
      .catch(() => dispatch(setError('Error loading!')))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const preparedTodos = useMemo(() => {
    let sortedTodos = [];

    switch (status) {
      case 'active':
        sortedTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        sortedTodos = todos.filter(todo => todo.completed);
        break;

      default:
        sortedTodos = todos;
    }

    return sortedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }, [status, query, todos]);

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
              <TodoList todos={preparedTodos} />

              {loading && <Loader />}
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
