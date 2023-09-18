import React, { useEffect, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as TodoAction } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((todos:Todo[]) => dispatch(TodoAction.SetTodos(todos)))
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setLoading(false));
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
                : (
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>
      {
        selectedTodo && (
          <TodoModal />
        )
      }
    </>
  );
};
