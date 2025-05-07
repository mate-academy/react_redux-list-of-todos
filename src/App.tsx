import 'bulma/css/bulma.css';
import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useDispatch, useSelector } from 'react-redux';
export const App = () => {
  const [loading, setLoading] = useState(false);
  const todos = useSelector(state => state.todos);
  const currentTodo = useSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      {' '}
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading && <Loader />}
              {todos.length !== 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal setLoading={setLoading} />}
    </>
  );
};
