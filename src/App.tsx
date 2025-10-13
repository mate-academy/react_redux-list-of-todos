import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .finally(() => setLoading(false));
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
              {loading && <Loader />}
              {!loading && <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
