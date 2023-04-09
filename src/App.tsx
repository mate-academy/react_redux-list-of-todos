/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const isSelectedTodo = currentTodo !== null;

  const loadTodos = async () => {
    setIsLoad(true);
    const todosFromServer = await getTodos();

    await dispatch({ type: 'todos/SET', payload: todosFromServer });
    setIsLoad(false);
  };

  useEffect(() => {
    try {
      loadTodos();
    } catch (error) {
      throw new Error('Error');
    }
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

              {isLoad && (<Loader />)}
              {!isLoad && (<TodoList />)}

            </div>
          </div>
        </div>
      </div>

      {isSelectedTodo && (<TodoModal />)}
    </>
  );
};
