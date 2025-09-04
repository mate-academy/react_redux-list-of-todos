import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openTodoId, setOpenTodoId] = useState<number | null>(null);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

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
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  openTodoId={openTodoId}
                  setOpenTodoId={setOpenTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal setOpenTodoId={setOpenTodoId} />}
    </>
  );
};
