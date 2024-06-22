import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hook';
import { todosSlice } from './features/todos';

export const App = () => {
  const todo = useAppSelector(state => state.currentTodo);
  /* const [todos, setTodos] = useState<Todo[] | []>([]); */
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(result => {
        dispatch(todosSlice.actions.addTodos(result));
      })
      .finally(() => setIsLoading(false));
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} />}
    </>
  );
};
