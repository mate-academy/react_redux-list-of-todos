import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todoActions } from './features/todos';
import { prepareTodos } from './utils/prepareTodos';
import { filterTodo } from './features/filter';
import { currentTodoActions } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const [isLoading, setIsLoading] = useState(false);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => dispatch(todoActions.setTodos(todos)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const alreadyTodo = prepareTodos(todos, query, status);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              query={query}
              setTitle={newQuery => dispatch(filterTodo.setQuery(newQuery))}
              setStatus={newStatus => dispatch(filterTodo.setStatus(newStatus))}
            />
          </div>

          <div className="block">
            {isLoading && <Loader />}
            {!isLoading && todos.length > 0 && (
              <TodoList
                todos={alreadyTodo}
                selectedTodo={selectedTodo}
                setSelectedTodo={selectedTodo =>
                  dispatch(currentTodoActions.setCurrentTodo(selectedTodo))
                }
              />
            )}
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={selectedTodo =>
            dispatch(currentTodoActions.setCurrentTodo(selectedTodo))
          }
        />
      )}
    </div>
  );
};
