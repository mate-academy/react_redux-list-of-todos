import React, { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useAppDispatch } from './app/hooks';
import { todosSlice } from './features/todos';

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadTodosFromServer = async () => {
      try {
        setIsLoading(true);
        const data = await getTodos();

        dispatch(todosSlice.actions.makeTodoList(data));
      } catch {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    };

    loadTodosFromServer();
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
              {isLoading ? <Loader /> : <TodoList setOpenInfo={setOpenInfo} />}
            </div>
          </div>
        </div>
      </div>
      {openInfo && <TodoModal setOpenInfo={setOpenInfo} openInfo={openInfo} />}
    </>
  );
};
