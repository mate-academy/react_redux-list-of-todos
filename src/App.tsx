import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as actionsTodos } from './features/todos';
import { actions as actionsCurrentTodo } from './features/currentTodo';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App = () => {
  const dispatch = useDispatch();
  const [loadingList, setLoadingList] = useState(false);
  const [loadingTodo, setLoadingTodo] = useState(false);
  const [user, setUser] = useState<User>();
  const filters = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoadingList(true);
      try {
        const response = await getTodos();

        dispatch(actionsTodos.setTodos(response));
      } finally {
        setLoadingList(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentTodo) {
        return;
      }

      setLoadingTodo(true);

      try {
        const response = await getUser(currentTodo.userId);

        setUser(response);
      } finally {
        setLoadingTodo(false);
      }
    };

    fetchUser();
  }, [currentTodo]);

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
              {loadingList ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  filters={filters}
                  currentTodo={currentTodo}
                  onCurrentTodo={todo =>
                    dispatch(actionsCurrentTodo.setCurrentTodo(todo))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          user={user}
          loading={loadingTodo}
          onClose={() => dispatch(actionsCurrentTodo.closeCurrentTodo())}
        />
      )}
    </>
  );
};
