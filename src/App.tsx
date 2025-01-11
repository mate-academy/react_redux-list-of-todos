/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const [listLoading, setListLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const fetchData = async () => {
      setListLoading(true);
      const todosDb = await getTodos();

      dispatch(todosSlice.actions.setTodos(todosDb as Todo[]));
      setListLoading(false);
    };

    fetchData();
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
              {listLoading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
