import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { RootState } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './features/todos';

export const App = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(todosToTake => dispatch(setTodos(todosToTake)))
      .finally(() => setLoadingTodos(false));
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
              {loadingTodos ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
