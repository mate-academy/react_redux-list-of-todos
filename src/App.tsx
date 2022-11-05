import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [isTodoListLoading, setIsTodoListLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filteredTodos = useAppSelector(state => state.filter);

  useEffect(() => {
    getTodos()
      .then(res => {
        dispatch(todosActions.setTodos(res));
      })
      .finally(() => setIsTodoListLoading(false));
  }, []);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId).then(res => {
      setCurrentUser(res);
    });
  }, [currentTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isTodoListLoading && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>
              </>
            )}

            <div className="block">
              {isTodoListLoading || !filteredTodos
                ? (<Loader />)
                : (<TodoList />)}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal user={currentUser} setUser={setCurrentUser} />
      )}
    </>
  );
};
