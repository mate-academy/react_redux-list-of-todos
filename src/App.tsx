import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { setCurrentTodo } from './features/currentTodo';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        dispatch(setTodos(fetchedTodos));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                search={query}
                onFilterChange={(newStatus: Status) =>
                  dispatch(setStatus(newStatus))
                }
                onSearchChange={newQuery => dispatch(setQuery(newQuery))}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={todo => dispatch(setCurrentTodo(todo))}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => dispatch(setCurrentTodo(null))}
          user={null}
        />
      )}
    </>
  );
};
