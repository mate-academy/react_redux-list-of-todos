import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader } from './components';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { filterTodos } from './helpers/helpers';
import TodoFilter from './components/TodoFilter/TodoFilter';
import TodoList from './components/TodoList/TodoList';
import TodoModal from './components/TodoModal/TodoModal';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [chosenStatus, setChosenStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(
    () => filterTodos(todos, query, chosenStatus),
    [todos, query, chosenStatus],
  );

  const selectedTodo = useMemo(() => {
    return filteredTodos.find((todo: Todo) => todo.id === selectedTodoId);
  }, [filteredTodos, selectedTodoId]);

  const closeModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                chosenStatus={chosenStatus}
                setChosenStatus={setChosenStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelect={setSelectedTodoId}
                />
              )}

              {isLoadingError && <p>Error occured while loading todos</p>}
            </div>

            {selectedTodo && (
              <TodoModal selectedTodo={selectedTodo} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
