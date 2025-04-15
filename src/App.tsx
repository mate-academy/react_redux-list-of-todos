import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/store';
import { useState } from 'react';

export const App = () => {
  const [listLoader, setListLoader] = useState(false);
  const currentTodo = useAppSelector(store => store.currentTodo);

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
              {listLoader ? (
                <Loader />
              ) : (
                <TodoList setListLoader={setListLoader} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
