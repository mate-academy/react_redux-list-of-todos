import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { RootState } from './app/store';

export const App = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = useState<boolean>(false);
  const [openTodoId, setOpenTodoId] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setLoading(true);
        dispatch(setTodos(todos));
      })
      .finally(() => {
        setLoading(false);
      });
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
