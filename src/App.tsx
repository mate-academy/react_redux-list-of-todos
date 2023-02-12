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
import { actions as todosAction } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoad(true);
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();

      dispatch(todosAction.setTodos(fetchedTodos));
    };

    fetchTodos()
      .finally(() => setIsLoad(false));
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
              {isLoad
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}

    </>
  );
};
