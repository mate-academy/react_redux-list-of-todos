import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';
import { todosSlice } from './features/todos';
import { useAppDispatch } from './app/hooks';
import { Todo } from './types/Todo';

export const App = () => {
  const todos = useSelector((state: RootState) => state.todosSlice);
  const currentTodo = useSelector((state: RootState) => state.currentTodoSlice);
  const [todosLoadErr, setTodosLoadErr] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then((response: Todo[]) => {
        dispatch(todosSlice.actions.setTodos(response));
      })
      .catch(() => {
        setTodosLoadErr(true);
      })
      .finally(() => setIsLoadingTodos(false));
  }, [dispatch]);

  useEffect(() => {
    if (currentTodo) {
      setIsLoadingUser(true);
      getUser(currentTodo.userId)
        .then(setSelectedUser)
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
        })
        .finally(() => setIsLoadingUser(false));
    }
  }, [currentTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList todosLoadErr={todosLoadErr} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          setSelectedUser={setSelectedUser}
          isLoadingUser={isLoadingUser}
          selectedUser={selectedUser}
          selectedTodo={currentTodo}
        />
      )}
    </>
  );
};
