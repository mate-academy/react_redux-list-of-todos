import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const filterStatus = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(getTodo => dispatch(setTodos(getTodo)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = todos
    .filter(todo => {
      if (filterStatus === 'active') {
        return !todo.completed;
      }

      if (filterStatus === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
                  todos={filteredTodos}
                  selectedTodoId={currentTodo ? currentTodo.id : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
