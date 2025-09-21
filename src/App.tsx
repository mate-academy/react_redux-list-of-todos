import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hook';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const activeTodo = useAppSelector(state => state.currentTodo);

  const setTodos = (value: Todo[]) => {
    dispatch(todosSlice.actions.setTodos(value));
  };

  useEffect(() => {
    getTodos()
      .then(result => setTodos(result))
      .finally(() => setIsLoading(false));
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {activeTodo && <TodoModal />}
    </>
  );
};
