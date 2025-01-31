/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { removeTodo, setTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOpenModal = (userId: number, todo: Todo) => {
    setSelectedUserId(userId);
    dispatch(setTodo(todo));
    setActive(true);
  };

  const handleCloseModal = () => {
    setActive(false);
    dispatch(removeTodo());
    setSelectedUserId(null);
  };

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
              {loading && <Loader />}
              <TodoList handleOpenModal={handleOpenModal} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        active={active}
        selectedUserId={selectedUserId}
        onClose={handleCloseModal}
      />
    </>
  );
};
