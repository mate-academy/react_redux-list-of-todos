/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { actions } from './features/todos';
import { getSelectedTodo, store } from './app/store';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const selectedTodo: Todo | null = useSelector(getSelectedTodo);

  useEffect(() => {
    if (selectedTodo === null) {
      setIsModalActive(false);
    } else {
      setIsModalActive(true);
    }
  }, [selectedTodo]);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(res => store.dispatch(actions.setTodos(res)))
      .catch(() => {
        throw new Error('Loading Todos error');
      })
      .finally(() => setIsTodosLoading(false));
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
              {isTodosLoading
                ? (<Loader />) : (
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>

      {isModalActive && <TodoModal />}
    </>
  );
};
