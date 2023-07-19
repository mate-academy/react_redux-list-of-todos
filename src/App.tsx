/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/allTodo';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const activeTodo = useAppSelector(state => state.activeTodo);

  const fetchTodos = async () => {
    setLoader(true);
    await getTodos().then(todos => dispatch(actionsTodos.setTodos(todos)));
    setLoader(false);
  };

  useEffect(() => {
    fetchTodos();
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
              {loader ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && <TodoModal />}
    </>
  );
};
