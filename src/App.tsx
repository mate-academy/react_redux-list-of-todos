import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { todosSlice } from './features/todos';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [todosLoading, setTodosLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const filteredTodos = useMemo(
    () =>
      todos.filter(todo => {
        if (filter.status === 'active') {
          return !todo.completed;
        }

        if (filter.status === 'completed') {
          return todo.completed;
        }

        return true;
      }),
    [filter.status, todos],
  );

  const searchedTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(filter.query.toLowerCase()),
  );

  useEffect(() => {
    setTodosLoading(true);

    getTodos()
      .then(data => {
        dispatch(todosSlice.actions.setTodos(data));
      })
      .finally(() => setTodosLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);
      setUserLoading(false);

      return;
    }

    setUserLoading(true);

    getUser(currentTodo.userId)
      .then(setUser)
      .finally(() => setUserLoading(false));
  }, [currentTodo]);

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
              {todosLoading ? <Loader /> : <TodoList todos={searchedTodos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal user={user} isLoading={userLoading} />
    </>
  );
};
