import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { User } from './types/User';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const [currentUser, setCurrentUser] = useState<User>();
  const [activeModal, setActiveModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isLoadingApp, setIsLoadingApp] = useState(true);

  useEffect(() => {
    getTodos()
      .then(value => dispatch(todosSlice.actions.add(value)))
      .finally(() => setIsLoadingApp(false));
  }, []);

  useEffect(() => {
    if (currentTodo) {
      setActiveModal(true);
      setIsLoadingModal(true);
      getUser(currentTodo.userId)
        .then(user => setCurrentUser(user))
        .finally(() => setIsLoadingModal(false));

      return;
    }

    setActiveModal(false);
  }, [currentTodo]);

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
              {(isLoadingApp && <Loader />) || <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {(isLoadingModal || currentUser) && activeModal && (
        <TodoModal
          user={currentUser}
          todo={currentTodo}
          isLoading={isLoadingModal}
        />
      )}
    </>
  );
};
