import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { prepareTodos } from './tools/prepareTodos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { todosActions } from './features/todos';
import { filterActions } from './features/filter';
import { currentTodoActions } from './features/currentTodo';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(readyTodos => dispatch(todosActions.setTodos(readyTodos)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const readyTodos = prepareTodos(todos, query, status);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setTitle={newQuery =>
                  dispatch(filterActions.setQuery(newQuery))
                }
                setStatus={newStatus =>
                  dispatch(filterActions.setStatus(newStatus))
                }
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && todos.length > 0 && (
                <TodoList
                  todos={readyTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={newSelectedTodo =>
                    dispatch(currentTodoActions.setCurrentTodo(newSelectedTodo))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={newSelectedTodo =>
            dispatch(currentTodoActions.setCurrentTodo(newSelectedTodo))
          }
        />
      )}
    </>
  );
};
