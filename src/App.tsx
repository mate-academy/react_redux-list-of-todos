import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getFilteredTodos } from './utils/GetFilteredTodos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((data: Todo[]) => {
        dispatch(todosSlice.actions.setTodos(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

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
              {!isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
