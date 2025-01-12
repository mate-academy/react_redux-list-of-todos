import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList, TodoFilter, TodoModal, Loader } from './components';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTodoData = () => {
    setIsLoading(true);
    getTodos()
      .then(todosArray => {
        dispatch(setTodos(todosArray));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(getTodoData, [dispatch]);

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
                <TodoList selectedItem={selectedTodo} />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
