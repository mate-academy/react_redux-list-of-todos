import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        dispatch(setTodos(await getTodos()));
      } finally {
      }
    };

    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {todos.length === 0 ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
