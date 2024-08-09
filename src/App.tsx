import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { getPrepearedTodos } from './helpers/getPrepearedTodos';

export const App = () => {
  const todos = useAppSelector(state => state.todosReducer);
  const [isLoading, setIsLoading] = useState(false);
  const filterSelect = useAppSelector(state => state.filterReducer.select);
  const filterQuery = useAppSelector(state => state.filterReducer.query);
  const selectedTodo = useAppSelector(state => state.currentTodoReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(fetchedTodos => {
        dispatch(todosSlice.actions.setTodos(fetchedTodos));
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
