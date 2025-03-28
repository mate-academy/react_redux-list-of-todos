import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Filter } from './types/Filter';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { setQuery, setStatus, clearQuery } from './features/filter';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const query = useAppSelector(state => state.filter.query);
  const filter = useAppSelector(state => state.filter.status);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return todos.filter((todo: Todo) => {
      const filteredByQuery = todo.title.toLowerCase().includes(lowerCaseQuery);

      switch (filter) {
        case Filter.Active:
          return filteredByQuery && !todo.completed;

        case Filter.Completed:
          return filteredByQuery && todo.completed;

        default:
          return filteredByQuery;
      }
    });
  }, [query, todos, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={e => dispatch(setQuery(e.target.value))}
                filter={filter}
                onFilterChange={newFilter => dispatch(setStatus(newFilter))}
                onClearQuery={() => dispatch(clearQuery())}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onSelect={setSelectedTodo} />
      )}
    </>
  );
};
