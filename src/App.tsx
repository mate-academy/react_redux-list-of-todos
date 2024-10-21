import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { getTodos } from './api';
import { setTodoList } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const todos = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const { status, query } = useSelector((state: RootState) => state.filter);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        dispatch(setTodoList(data));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodosList = useMemo(() => {
    let filteredTodos = todos;

    if (status === 'active') {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filteredTodos = todos.filter(todo => todo.completed);
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [query, status, todos]);

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
                <TodoList todoList={filteredTodosList} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
