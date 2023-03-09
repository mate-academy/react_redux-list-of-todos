/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { actions as TodosActions } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setTodos = (currentTodos: Todo[]) => dispatch(TodosActions.setTodos(currentTodos));

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(result => {
        setTodos(result);
        setLoading(false);
      });
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
              {loading
                ? <Loader />
                : <TodoList />}
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
