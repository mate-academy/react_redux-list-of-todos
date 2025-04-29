import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { Todo } from './types/Todo';

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

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
              {isLoading && !hasError && <Loader />}
              {!isLoading && (
                <TodoList
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
