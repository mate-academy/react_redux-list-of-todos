import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hook';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const filteres = useAppSelector(state => state.filter);

  const filteredTodo = useCallback(
    (todos: Todo[]) => {
      let filteredTodos = todos;

      switch (filteres.status) {
        case Status.completed:
          filteredTodos = filteredTodos.filter(item => item.completed);
          break;
        case Status.active:
          filteredTodos = filteredTodos.filter(item => !item.completed);
          break;
        default:
          filteredTodos = todos;
      }

      if (filteres.query) {
        filteredTodos = filteredTodos.filter(item => {
          const reg = new RegExp(filteres.query, 'i');

          return reg.test(item.title);
        });
      }

      return filteredTodos;
    },
    [filteres],
  );

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(result => {
        dispatch(todosSlice.actions.addTodos(filteredTodo(result)));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, filteredTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} />}
    </>
  );
};
