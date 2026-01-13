import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchFailed, fetchStarted, fetchSucces } from './features/todos';
import { useAppSelector } from './hooks/useAppSelector';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStarted());

    async function loadTodos() {
      try {
        const data = await getTodos();

        dispatch(fetchSucces(data));
      } catch (err) {
        dispatch(fetchFailed(String()));
      }
    }

    loadTodos();
  }, [dispatch]);

  const { currentTodo } = useAppSelector(state => state.currentTodo);

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
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
