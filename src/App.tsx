import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { Todo } from './types/Todo';
import { useAppSelector } from './hooks';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useDispatch();
  const setCurrentTodos = (todos: Todo[]) => dispatch(setTodos(todos));
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const filters = useAppSelector(state => state.filters);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filterTodos = () => {
    const filteredByQueryTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(filters.query.toLowerCase()),
    );

    switch (filters.status) {
      case 'active':
        return filteredByQueryTodos.filter(todo => todo.completed === false);
      case 'completed':
        return filteredByQueryTodos.filter(todo => todo.completed === true);
      default:
        return filteredByQueryTodos;
    }
  };

  const visibleTodos = filterTodos();

  useEffect(() => {
    getTodos()
      .then(result => setCurrentTodos(result))
      .catch(() => setHasError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
              {isLoading ? <Loader /> : <TodoList todos={visibleTodos} />}
              {!isLoading && hasError && <div>Oops, there is some error</div>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
