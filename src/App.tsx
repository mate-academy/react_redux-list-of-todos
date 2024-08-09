import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useEffect } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((value: Todo[]) => dispatch(todosSlice.actions.setTodos(value)))
      .finally(() => setLoading(false));
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

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
