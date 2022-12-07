/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todoAction } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState(false);

  async function getTodosFromServer() {
    try {
      const todosFromServer = await getTodos();

      dispatch(todoAction.add(todosFromServer));
    } catch {
      throw new Error();
    } finally {
      setLoading(true);
    }
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading ? (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>

            ) : <Loader />}
          </div>
        </div>
      </div>

      { currentTodo && (<TodoModal />)}
    </>
  );
};
