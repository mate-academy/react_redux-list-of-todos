import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './hooks';
import { actions as currentTodoAction } from './features/currentTodo';
import { actions as todosAction } from './features/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  const handleTodo = (todo: Todo) => {
    setUser(null);
    dispatch(currentTodoAction.getCurrentTodo(todo));
    getUser(todo.userId).then(setUser);
  };

  const handleClose = () => {
    setUser(null);
    dispatch(currentTodoAction.getCurrentTodo(null));
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(loadedTodos => {
        dispatch(todosAction.setTodos(loadedTodos));
      })
      .finally(() => {
        setIsLoading(false);
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  handleTodo={handleTodo}
                  selectedTodoId={currentTodo?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal close={handleClose} user={user} />
    </>
  );
};
