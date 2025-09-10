import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App = () => {
  const todo = useAppSelector(state => state.currentTodoSlice.currentTodo);
  const loader = useAppSelector(state => state.todos.loader);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.setIsTodoLoading(true));

    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .finally(() => dispatch(todosActions.setIsTodoLoading(false)));
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

            <div className="block">{loader ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
