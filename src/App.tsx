import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useMemo, useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { Status } from './types/Status';

export const App = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const filteres = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    let result = todos;

    switch (filteres.status) {
      case Status.completed:
        result = result.filter(item => item.completed);
        break;
      case Status.active:
        result = result.filter(item => !item.completed);
        break;
      default:
        result = todos;
    }

    if (filteres.query) {
      result = result.filter(item => {
        const reg = new RegExp(filteres.query, 'i');

        return reg.test(item.title);
      });
    }

    return result;
  }, [todos, filteres]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(result => {
        dispatch(todosSlice.actions.addTodos(result));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} />}
    </>
  );
};
