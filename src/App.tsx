/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import TodoList from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter';
import TodoModal from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [fetchFailed, setFecthFailed] = useState(false);
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(res => {
        dispatch(todosActions.setTodos(res));
      })
      .catch(() => setFecthFailed(true));
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
              {todos.length === 0 ? (<Loader />) : (<TodoList />)}
              {fetchFailed && 'Something went wrong'}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (<TodoModal />)}
    </>
  );
};
