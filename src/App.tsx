import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const currTodo = useAppSelector((state: RootState) => state.currentTodo);

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
              <TodoList />
            </div>
          </div>
        </div>
      </div>
      {currTodo && <TodoModal />}
    </>
  );
};
