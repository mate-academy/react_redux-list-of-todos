/* eslint-disable max-len */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const setTodos = useCallback((todos: Todo[]) => dispatch(todosActions.setTodos(todos)), [dispatch]);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        throw new Error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setTodos]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const goodTodo = todo.title.toLowerCase().trim().includes(
        query.toLowerCase().trim(),
      );

      switch (status) {
        case Status.ALL:
          return goodTodo;

        case Status.ACTIVE:
          return goodTodo && !todo.completed;

        case Status.COMPLETED:
          return goodTodo && todo.completed;

        default:
          throw new Error('Incorrect status');
      }
    });
  }, [todos, query, status]);

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
              {isLoading
                ? <Loader />
                : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
