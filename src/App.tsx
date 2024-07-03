import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader } from './components';
import { FC, useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { filterTodos } from './helpers/helpers';
import TodoFilter from './components/TodoFilter/TodoFilter';
import TodoList from './components/TodoList/TodoList';
import TodoModal from './components/TodoModal/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addTodos } from './features/todos';

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const dispatch = useAppDispatch();

  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    const handleTodosAdding = (fetchedTodos: Todo[]) => {
      dispatch(addTodos(fetchedTodos));
    };

    getTodos()
      .then(data => handleTodosAdding(data))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = useMemo(
    () => filterTodos(todos, filter.query, filter.status),
    [todos, filter.query, filter.status],
  );

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

              {isLoadingError && <p>Error occured while loading todos</p>}
            </div>

            {selectedTodo && <TodoModal />}
          </div>
        </div>
      </div>
    </>
  );
};
