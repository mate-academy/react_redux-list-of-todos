import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect } from 'react';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';

import * as todosActions from './features/todos';
import * as filterActions from './features/filter';
import * as todoActions from './features/selectedTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { todos, loading } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const {
    todo: selectedTodo,
    user,
    loadingSelectedTodo,
  } = useAppSelector(state => state.selectedTodo);

  useEffect(() => {
    dispatch(todosActions.setLoading(true));

    getTodos()
      .then(data => {
        dispatch(todosActions.setTodos(data));
      })
      .catch(() => {
        dispatch(
          todosActions.setError('Something went wrong while loading todos'),
        );
      })
      .finally(() => {
        dispatch(todosActions.setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    dispatch(todoActions.setLoadingTodo(true));

    getUser(selectedTodo.userId)
      .then(userData => {
        dispatch(todoActions.setUser(userData));
      })
      .catch(() => {
        dispatch(todoActions.setError('Failed to load user'));
      })
      .finally(() => {
        dispatch(todoActions.setLoadingTodo(false));
      });
  }, [selectedTodo, dispatch]);

  const visibleTodos = todos.filter(todo => {
    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (status === 'active' && todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <TodoFilter
        searchValue={query}
        filterStatus={status}
        onSearchChange={value => dispatch(filterActions.setQuery(value))}
        onFilterChange={value => dispatch(filterActions.setStatus(value))}
      />

      {loading ? (
        <Loader />
      ) : (
        <TodoList
          todos={visibleTodos}
          selectedTodo={selectedTodo}
          setSelectedTodo={todo => dispatch(todoActions.setTodo(todo))}
        />
      )}

      {selectedTodo && (
        <TodoModal
          user={user}
          selectedTodo={selectedTodo}
          loadingUser={loadingSelectedTodo}
          onClose={() => dispatch(todoActions.setTodo(null))}
        />
      )}
    </>
  );
};
