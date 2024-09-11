import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api';
import { getFilteredTodos } from './services/getFilteredTodos';
import { useAppSelector } from './app/store';
import { useDispatch } from 'react-redux';
import { actions as todosActions, todosSelector } from './features/todos';
import {
  actions as currentTodoActions,
  currentTodoSelector,
} from './features/currentTodo';
import { filterSelector } from './features/filter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const todos = useAppSelector(todosSelector);
  const currentTodo = useAppSelector(currentTodoSelector);
  const filter = useAppSelector(filterSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(value => dispatch(todosActions.set(value)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    dispatch(currentTodoActions.set(null));
  }, [dispatch]);

  const preparedTodos = getFilteredTodos(todos, filter);

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
              <TodoList todos={preparedTodos} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
