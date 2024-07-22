import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const todos = useAppSelector(state => state.todosReducer);
  const selectedTodo = useAppSelector(state => state.currentTodoReducer);
  const filterBy = useAppSelector(state => state.filterReducer.status);
  const query = useAppSelector(state => state.filterReducer.query);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.setTodos(todosFromServer));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const preparedTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) => {
        switch (filterBy) {
          case Status.active:
            return !todo.completed;

          case Status.completed:
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
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList todos={preparedTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
