import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList } from './components';
import { useAppSelector } from './hooks';
import { RootState } from './app/store';

export const App = () => {
  const status = useAppSelector((state: RootState) => state.todos.status);
  console.log(status);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {status === 'loading' ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
