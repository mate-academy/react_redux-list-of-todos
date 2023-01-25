/* eslint-disable max-len */
import {
  FC,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorHappened, setHasErrorHappened] = useState(false);

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todosFromServer) => {
        dispatch(todosActions.set(todosFromServer));
      })
      .catch(() => setHasErrorHappened(true))
      .finally(() => setIsLoading(false));
  }, []);

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
              {
                isLoading && <Loader />
              }

              {
                !hasErrorHappened && !isLoading && <TodoList />
              }

              {
                hasErrorHappened && !isLoading && (
                  <p className="notification is-danger">
                    There are no todos matching current filter criteria
                  </p>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {
        !!selectedTodo && <TodoModal />
      }
    </>
  );
};
