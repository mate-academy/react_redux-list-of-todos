import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const hasTodos = useAppSelector(state => state.todos.length > 0);
  const hasSelectedTodo = useAppSelector(state => state.currentTodo !== null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos().then(todosFromServer =>
      dispatch(todosSlice.actions.set(todosFromServer)),
    );
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

            <div className="block">{!hasTodos ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {hasSelectedTodo && <TodoModal />}
    </>
  );
};
