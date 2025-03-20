import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { filterTodos } from './helpers/filterTodos';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = filterTodos(todos, { query, status });

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.addTodos(todosFromServer));
      })
      .catch(() => {
        throw new Error();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList todos={visibleTodos} />
                </div>

                {currentTodo && <TodoModal todo={currentTodo} />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
