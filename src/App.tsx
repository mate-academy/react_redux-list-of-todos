import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';

export const App = () => {
  const todo = useAppSelector((state: RootState) => state.currentTodo);
  const loading = useAppSelector((state: RootState) => state.todos.loading);

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
              {loading && <Loader />}
              <div style={{ display: loading ? 'none' : 'block' }}>
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
      {todo && <TodoModal />}
    </>
  );
};
