import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const fetchTodosData = async () => {
    try {
      const todosData = await getTodos();

      dispatch(todosSlice.actions.setTodos(todosData));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                {todos.length < 0 && <Loader />}
                <TodoList todos={todos} />
              </div>
            </div>
          </div>
        </div>
      )}

      {currentTodo && <TodoModal />}
    </>
  );
};
