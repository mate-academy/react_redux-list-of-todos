import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

function getVisibleTodos(todos: Todo[], { query, status }: Filter) {
  return todos.filter(todo => {
    const isQuery = todo.title.toLowerCase().includes(query);
    const isStatus =
      status === 'all'
        ? true
        : status === 'completed'
          ? todo.completed
          : !todo.completed;

    return isQuery && isStatus;
  });
}

export const App = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { currentTodo, filter } = useAppSelector(state => state);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todosFromServer, filter),
    [filter, todosFromServer],
  );

  useEffect(() => {
    dispatch(todosSlice.actions.changeTodos(visibleTodos));
  }, [visibleTodos]);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => setTodosFromServer(todos))
      .catch(() => {
        throw new Error('Todos load fail');
      })
      .finally(() => setLoading(false));
  }, []);

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

              {!!visibleTodos.length && !loading && <TodoList />}

              {!!todosFromServer.length && !visibleTodos.length && (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
