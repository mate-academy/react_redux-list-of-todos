/* eslint-disable react-hooks/exhaustive-deps */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { Status } from './types/Status';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Filter } from './features/filter';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const { query, status }: Filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);

    getTodos().then(newTodos => dispatch(todosActions.set(newTodos)));
  }, []);

  const filteredByQuery = useMemo(
    () => todos.filter((todo) => {
      const normalizedQuery = query.trim();

      return todo.title.toLowerCase().includes(normalizedQuery.toLowerCase());
    }),
    [query, todos],
  );

  const visibleTodos = useMemo(
    () => filteredByQuery.filter((todo) => {
      switch (status) {
        case Status.all:
          return todo;
        case Status.active:
          return !todo.completed;
        case Status.completed:
          return todo.completed;
        default:
          return todo;
      }
    }),
    [status, filteredByQuery],
  );

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
              {loading && <Loader />}
              <TodoList loading={loading} todos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && <TodoModal />}
    </>
  );
};
