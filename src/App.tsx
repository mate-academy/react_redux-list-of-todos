/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { addTodos } from './features/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorFromServer, setHasErrorFromServer] = useState(false);

  const setInitialTodos = async () => {
    try {
      const fetchedTodos: Todo[] = await getTodos();

      dispatch(addTodos(fetchedTodos));
    } catch (error) {
      setIsLoading(true);
      setHasErrorFromServer(true);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    setInitialTodos();
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
              {isLoading && <Loader />}
              {hasErrorFromServer
                ? <p>Error while catching</p>
                : (
                  <TodoList />
                )}

            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal />
      )}

    </>
  );
};
