import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {TodoFilter, TodoList, TodoModal } from './components';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';

export const App = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

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
              {/* <Loader /> */}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
