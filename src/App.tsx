import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setCurrentTodo } from './features/currentTodo';
import { setCurrentUser } from './features/currentUser';
import { useEffect } from 'react';
import { getTodos } from './api';
import { setTodos, setTodosLoading } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(state => state.currentUser);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { isLoading } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(setTodosLoading(true));
    getTodos().then(todosFromServer => {
      dispatch(setTodos(todosFromServer));
    });
  }, [dispatch]);
  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
    dispatch(setCurrentUser(null));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          user={currentUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
