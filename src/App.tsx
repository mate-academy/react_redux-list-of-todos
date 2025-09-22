import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { currentTodoSlice } from './features/currentTodo';
import { Todo } from './types/Todo';
import { filterSlice } from './features/filter';
import { Status } from './types/Status';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  const selectedTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setTodo(todo));
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const statusChange = (status: Status) => {
    dispatch(filterSlice.actions.setStatus(status));
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const queryChange = (query: string) => {
    dispatch(filterSlice.actions.setQuery(query));
  };

  const queryClear = () => dispatch(filterSlice.actions.clearQuery());

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(todo => {
      dispatch(todosSlice.actions.setTodos(todo));
      setIsLoading(false);
    });
  }, [dispatch]);

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
                onStatusChange={statusChange}
                onSearchChange={queryChange}
                onClearChange={queryClear}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} onSelectTodo={selectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currTodo={currentTodo} />}
    </>
  );
};
