import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { Todo } from './types/Todo';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const todos = useAppSelector(state => state.todos);

  const isModalOpen = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (todos.length > 0) {
      return;
    }

    setIsLoading(true);

    getTodos()
      .then((response: Todo[]) => dispatch(setTodos(response)))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, [dispatch, todos]);

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
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <TodoModal />}
    </>
  );
};
