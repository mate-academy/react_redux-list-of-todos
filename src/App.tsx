import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { Todo } from './types/Todo';
import { setTodos } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useDispatch();
  const todoList = useAppSelector(state => state.todos);
  const modalTodo = useAppSelector(state => state.currentTodo);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todoList.length > 0) {
      return;
    }

    setLoading(true);

    getTodos()
      .then((response: Todo[]) => dispatch(setTodos(response)))
      // eslint-disable-next-line no-console
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [dispatch, todoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {modalTodo && <TodoModal />}
    </>
  );
};
