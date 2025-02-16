import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { StatusType } from './types/Status';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { setStatus } from './features/filter';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
        dispatch(setStatus('all'));
      });
  }, [dispatch]);

  const preparedTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      switch (status) {
        case StatusType.Active:
          return !todo.completed;

        case StatusType.Completed:
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
              {isLoading ? <Loader /> : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && <TodoModal />}
    </>
  );
};
