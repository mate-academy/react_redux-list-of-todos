import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, setLoading, setSelectedTodo } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, selectedTodo, loading } = useAppSelector(state => state.todos);

  const { status, query } = useAppSelector(state => state.filter);

  useEffect(() => {
    dispatch(setLoading(true));

    getTodos()
      .then(fetchedTodos => {
        dispatch(setTodos(fetchedTodos));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const preparedTodos = items.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            {loading ? <Loader /> : <TodoList array={preparedTodos} />}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedobj={selectedTodo}
          onClose={() => dispatch(setSelectedTodo(null))}
        />
      )}
    </div>
  );
};
