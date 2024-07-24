import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { RootState } from './app/store';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state: RootState) => state.modal.isOpen);

  useEffect(() => {
    getTodos()
      .then((todos: Todo[]) => {
        dispatch(todosSlice.actions.setTodos(todos));
      })
      .catch(e => {
        throw new Error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              {isLoading && <Loader />}
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && <TodoModal />}
    </>
  );
};
