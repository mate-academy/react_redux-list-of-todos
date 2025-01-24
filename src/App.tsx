import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todos } from './features/todos';
import { RootState } from './app/store';

export const App = () => {
  const todosList = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    async function getContent() {
      try {
        const content = await getTodos();

        dispatch(todos(content));
      } catch (error) {
        dispatch(todos([]));
      }
    }

    getContent();
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
              {todosList.length === 0 ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
