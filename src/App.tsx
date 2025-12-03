import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const [, setIsTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateAt, setUpdateAt] = useState<Date>(new Date());

  function reload() {
    setUpdateAt(new Date());
    setError(null);
  }

  const dispatch = useAppDispatch();

  const addTodos = useCallback(
    (todos: Todo[]) => {
      dispatch(todosSlice.actions.setTodos(todos));
    },
    [dispatch],
  );

  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    setLoadingTodos(true);

    const isData = async () => {
      try {
        const result = await getTodos();

        if (result) {
          setIsTodos(result);
          addTodos(result);
        }

        return [];
      } catch (e) {
        setError('Request failed');

        throw e;
      } finally {
        setLoadingTodos(false);
      }
    };

    isData();
  }, [addTodos, updateAt]);

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
              {!loadingTodos && todos.length > 0 && <TodoList />}
              {!loadingTodos && !error && todos.length === 0 && (
                <p className="title is-5">There are no users</p>
              )}
              {error && (
                <p className="notification is-danger">
                  {error}
                  <button onClick={reload}>Reload</button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {loadingTodos ? (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
          <Loader />
        </div>
      ) : currentTodo ? (
        <TodoModal />
      ) : null}
    </>
  );
};
