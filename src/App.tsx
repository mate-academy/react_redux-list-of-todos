import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/store';
import { actions as todosActions, todosSelector } from './features/todos';
import {
  actions as currentTodoActions,
  currentTodoSelector,
} from './features/currentTodo';
import { filterSelector } from './features/filter';
import { handleFilter } from './services/filterTodos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const todos = useAppSelector(todosSelector);
  const currentTodo = useAppSelector(currentTodoSelector);
  const filter = useAppSelector(filterSelector);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(value => dispatch(todosActions.set(value)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const onCloseHandler = () => {
    dispatch(currentTodoActions.set(null));
  };

  const preparedTodos = handleFilter(todos, filter);

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
              {!isLoading && todos.length > 0 ? (
                <TodoList todos={preparedTodos} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} onClose={onCloseHandler} />}
    </>
  );
};
