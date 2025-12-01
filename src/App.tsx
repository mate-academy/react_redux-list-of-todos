import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { setCurrentTodo } from './features/currentTodo';
import { setQuery, setStatus } from './features/filter';

export const App = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);

      try {
        const todosFromServer = await getTodos();

        dispatch(setTodos(todosFromServer));
      } catch (error) {
        // eslint-disable-next-line
        console.error('Error loading todos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  const handleSelect = (todoId: number) => {
    if (selectedTodo?.id === todoId) {
      dispatch(setCurrentTodo(null));
    } else {
      const todoToSelect = todos.find(todo => todo.id === todoId) || null;

      dispatch(setCurrentTodo(todoToSelect));
    }
  };

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
                onStatusChange={newStatus => dispatch(setStatus(newStatus))}
                onSearchChange={newQuery => dispatch(setQuery(newQuery))}
                onClearSearch={() => dispatch(setQuery(''))}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={handleSelect}
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
        />
      )}
    </>
  );
};
