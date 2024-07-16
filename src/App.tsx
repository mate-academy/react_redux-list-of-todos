import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const [loading, setLoading] = useState(false);
  const [isTodoModalShown, setIsTodoModalShown] = useState(false);

  const filteredTodos = todos
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        dispatch(setTodos(data));
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
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  setIsTodoModalShown={setIsTodoModalShown}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isTodoModalShown && (
        <TodoModal
          loading={loading}
          setLoading={setLoading}
          setIsTodoModalShown={setIsTodoModalShown}
        />
      )}
    </>
  );
};
