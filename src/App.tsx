import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(true);

  const selectedTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(newTodos => {
        dispatch(todosSlice.actions.loadTodos(newTodos));
      })
      .finally(() => setIsloading(false));
  }, [dispatch]);

  useEffect(() => {
    if (selectedTodo) {
      setIsTodoModalOpen(true);
    } else {
      setIsTodoModalOpen(false);
    }
  }, [selectedTodo]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="block">
                <TodoFilter />
              </div>
              <div className="block">
                <TodoList setSelectedUserId={setSelectedUserId} />
                {isTodoModalOpen && (
                  <TodoModal selectedUserId={selectedUserId} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
