import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { setTodos as setTodosAction } from './features/todos';
import { clearCurrentTodo } from './features/currentTodo';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodoSlice);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(setTodosAction(todos)))
      .catch(() => alert('Error while loading todos'))
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    setUserLoading(true);
    getUser(selectedTodo.userId)
      .then(user => setSelectedUser(user))
      .catch(() => alert('Error whith selected todo'))
      .finally(() => setUserLoading(false));
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={userLoading}
          onClose={() => dispatch(clearCurrentTodo())}
        />
      )}
    </>
  );
};
