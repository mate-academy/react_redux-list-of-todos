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
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { clearCurrent, setCurrent } from './features/currentTodo';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isModal, setIsModal] = useState(false);

  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleShow = (todo: Todo) => {
    dispatch(setCurrent(todo));
    setIsModal(true);
  };

  const handleClose = () => {
    dispatch(clearCurrent());
    setIsModal(false);
  };

  const visibleTodos = todos.filter(todo => {
    const matchedStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchedQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchedQuery && matchedStatus;
  });

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
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShow={handleShow}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && isModal && (
        <TodoModal todo={selectedTodo} onClose={handleClose} />
      )}
    </>
  );
};
