import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/store';
import { currentTodoSelector } from './features/currentTodo';
import { actions as todosActions, todosSelector } from './features/todos';
import { filterSelector } from './features/filter';
import { Status } from './types/Status';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const todos = useAppSelector(todosSelector);
  const currentTodo = useAppSelector(currentTodoSelector);
  const filter = useAppSelector(filterSelector);

  useEffect(() => {
    getTodos()
      .then(value => dispatch(todosActions.set(value)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = todos
    .filter(todo =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase()),
    )
    .filter(todo => {
      switch (filter.status) {
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return true;
      }
    });

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
              {!isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
