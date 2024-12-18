import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import * as todosAction from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.todos);
  const { todo: currentUser } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(todosAction.init());
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

      {!!currentUser && <TodoModal />}
    </>
  );
};
