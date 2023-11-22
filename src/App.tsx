import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as TodosActions } from './features/todos';

export const App: React.FC = () => {
  const [areLoadingTodos, setAreLoadingTodos] = useState(false);

  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setAreLoadingTodos(true);
    getTodos()
      .then((response) => dispatch(TodosActions.setTodos(response)))
      .finally(() => setAreLoadingTodos(false));
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
              {areLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
