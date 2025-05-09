import { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { setTodos, setLoading } from './features/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.todos.loading);
  const isModalOpen = useAppSelector(state => state.modal.isOpen);

  useEffect(() => {
    dispatch(setLoading(true)); // ✅ Start loading
    getTodos()
      .then((todos: Todo[]) => {
        dispatch(setTodos(todos)); // ✅ Pass the array directly
        dispatch(setLoading(false)); // ✅ Stop loading
      })
      .catch(() => {
        dispatch(setLoading(false)); // ✅ Stop loading
        // Handle error here if needed
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
              {isLoading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <TodoModal />}
    </>
  );
};
