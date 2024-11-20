import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hook';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { Todo } from './types/Todo';
import { Filters } from './types/Filter';

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);

  const status = useAppSelector(state => state.filterTodos.status);
  const query = useAppSelector(state => state.filterTodos.query);

  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);

  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoadingTodos(true);
        const fetchedTodos: Todo[] = await getTodos();

        dispatch(setTodos(fetchedTodos));
      } catch {
        throw new Error('Failed to fetch todos');
      } finally {
        setIsLoadingTodos(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const matchesFilter =
      status === Filters.All ||
      (status === Filters.Active && !todo.completed) ||
      (status === Filters.Completed && todo.completed);

    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter status={status} query={query} />
            </div>

            <div className="block">
              {isLoadingTodos ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
