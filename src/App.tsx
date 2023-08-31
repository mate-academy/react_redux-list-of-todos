/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
// import { getTodos } from './api';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterQuery } from './enums';
import { getTodos } from './features/todos';

export const App: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const [isLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState(FilterQuery.ALL);
  const [searchQuery, setSearchQuery] = useState<null | string>(null);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  useEffect(() => {
    // getTodos()
    //   .then(setTodos)
    //   .catch(error => {
    //     // eslint-disable-next-line no-console
    //     console.error(error);
    //   })
    //   .finally(() => setIsLoading(false));
    dispatch(getTodos());
  }, [dispatch]);

  const visibleTodos = useMemo(() => {
    const preparedTodos = filterQuery === FilterQuery.ALL
      ? todos
      : todos.filter(todo => {
        if (filterQuery === FilterQuery.ACTIVE) {
          return !todo.completed;
        }

        return todo.completed;
      });

    if (searchQuery) {
      return preparedTodos.filter(todo => (
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }

    return preparedTodos;
  }, [todos, filterQuery, searchQuery]);

  const applyFilter = useCallback((value) => setFilterQuery(value), []);
  const applyQuery = useCallback((value) => setSearchQuery(value), []);
  const clearSelectedTodo = useCallback(() => setSelectedTodo(null), []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterQuery={filterQuery}
                applyFilter={applyFilter}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    selectTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={clearSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
