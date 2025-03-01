import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { FILTERS } from './types/Filters';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const { todo: currentTodo, selectedTodoUser } = useAppSelector(
    state => state.currentTodo,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filteredTodos = todos;

  if (query !== '' && todos !== null) {
    filteredTodos = todos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
    );
  }

  if (status !== FILTERS.ALL && filteredTodos !== null) {
    switch (status) {
      case FILTERS.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case FILTERS.COMPLETED:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }
  }

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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoUser && currentTodo && <TodoModal />}
    </>
  );
};
