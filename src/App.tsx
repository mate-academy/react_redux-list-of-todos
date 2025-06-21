import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components';
import { Todo } from './types/Todo';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';

export const App = () => {
  const dispatch = useDispatch();
  const [loadingTodos, setLoadingTodos] = useState(false);
  const pick = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoadingTodos(true);

        const data: Todo[] = await getTodos();

        dispatch(setTodos(data)); // 👈 Зберігаємо в redux
      } finally {
        setLoadingTodos(false);
      }
    };

    fetchTodos();
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
              <Loader loadingTodos={loadingTodos} />
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {pick && <TodoModal />}
    </>
  );
};
