import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { todosSlice } from './features/todos';
import { getTodos } from './api';
import { useAppSelector } from './app/hook';
import { Todo } from './types/Todo';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const todos = useAppSelector(state => state.todosReducer);
  const currentTodo = useAppSelector(state => state.currentTodoReducer);
  const filterBy = useAppSelector(state => state.filterReducer.status);
  const query = useAppSelector(state => state.filterReducer.query);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(fetchTodos => dispatch(todosSlice.actions.setTodos(fetchTodos)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const preparedTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) => {
        switch (filterBy) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return todo;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
      );
  }, [filterBy, todos, query]);

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
              {isLoading ? <Loader /> : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
