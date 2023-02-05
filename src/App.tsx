/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import { useDispatch } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const targetTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function loadingTodosFromServer() {
    setIsLoading(true);

    const todosFromServer = await getTodos();

    try {
      dispatch(actions.setTodos(todosFromServer));
    } catch (error) {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadingTodosFromServer();
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
              {isLoading ? <Loader /> : <TodoList /> }
            </div>
          </div>
        </div>
      </div>

      {targetTodo && <TodoModal />}
    </>
  );
};
