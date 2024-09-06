import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { getVisibleTodos } from './helpers/getVisibleTodos';
import { setTodos } from './features/todos';
import { getAllTodos } from './helpers/getAllTodos';
import { setSelectedTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const { query, status } = useSelector((state: RootState) => state.filter);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    dispatch(setSelectedTodo(null));
    setShowModal(false);
  };

  useEffect(() => {
    getAllTodos(setIsLoading, data => dispatch(setTodos(data)));
  }, []);

  const visibleTodos = getVisibleTodos(todos, status, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  showModalWindow={setShowModal}
                  isShowModal={showModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
