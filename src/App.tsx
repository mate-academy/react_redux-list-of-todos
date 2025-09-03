import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  useEffect(() => {
    dispatch(todosActions.setLoading(true));
    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.set(todosFromServer));
      })
      .catch(() => {
        dispatch(todosActions.setError(true));
      })
      .finally(() => {
        dispatch(todosActions.setLoading(false));
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

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
              <TodoList visibleTodos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo ? <TodoModal todo={currentTodo} /> : ''}
    </>
  );
};
