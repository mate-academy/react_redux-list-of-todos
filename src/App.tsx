import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './hooks/useAppSelector';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  function onAddUser() {
    setLoadingUser(current => !current);
  }

  useEffect(() => {
    getTodos()
      .then(todos => dispatch({ type: 'todos/setTodos', payload: todos }))
      .finally(() => setLoading(false));
  }, []);

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
              {loading ? <Loader /> : <TodoList onAddUser={onAddUser} />}
            </div>
          </div>
        </div>
      </div>

      {(loadingUser || currentTodo) && <TodoModal />}
    </>
  );
};
