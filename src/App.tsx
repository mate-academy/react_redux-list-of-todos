import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { setTodos } from './features/todos';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hooks/useAppSelector';

export const App = () => {
  const dispatch = useDispatch();

  const isModalShown = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);
  const todoList = useAppSelector(state => state.todos);

  useEffect(() => {
    if (todoList.length > 0) {
      return;
    }

    setIsLoading(true);

    getTodos()
      .then((response: Todo[]) => dispatch(setTodos(response)))
      // eslint-disable-next-line no-console
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, [dispatch, todoList]);

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
              {!isLoading && todoList.length !== 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {isModalShown && <TodoModal />}
    </>
  );
};
