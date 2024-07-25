import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { AppDispatch, RootState } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './features/todos';

export const App = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [todosLoadErr, setTodosLoadErr] = useState<boolean>(false);
  // const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const currentTodo = useSelector((state: RootState) => state.todos.current);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(t => {
        dispatch(setTodos(t));
        setFilteredTodos(t);
      })
      .catch(() => {
        setTodosLoadErr(true);
      })
      .finally(() => setIsLoadingTodos(false));
  }, [dispatch]);

  useEffect(() => {
    if (currentTodo) {
      setIsLoadingUser(true);
      getUser(currentTodo?.userId)
        .then(setSelectedUser)
        .catch(err => {
          throw new Error(err);
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
              <TodoFilter todos={todos} setFilteredTodos={setFilteredTodos} />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}
              {!isLoadingTodos && (
                <TodoList
                  setSelectedTodo={setCurrentTodo}
                  todos={filteredTodos}
                  todosLoadErr={todosLoadErr}
                />
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
          setSelectedTodo={setCurrentTodo}
        />
      )}
    </>
  );
};
