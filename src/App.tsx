import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './hooks';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

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
              {false && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo.todo && <TodoModal todo={currentTodo.todo} />}
    </>
  );
};
