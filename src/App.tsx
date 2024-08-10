import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { getPrepearedTodos } from './helpers/getPrepearedTodos';

export const { setTodos } = todosSlice.actions;

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const [isLoading, setIsLoading] = useState(false);
  const filterSelect = useAppSelector(state => state.filter.select);
  const filterQuery = useAppSelector(state => state.filter.query);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(fetchedTodos => {
        dispatch(setTodos(fetchedTodos));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    return getPrepearedTodos(todos, filterQuery, filterSelect);
  }, [todos, filterQuery, filterSelect]);

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
              {isLoading && <Loader />}

              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
