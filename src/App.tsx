import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { TODOS_ACTIONS } from './features/todos';
import { TODO_SELECTORS } from './features/currentTodo';
import { LOADING_ACTIONS, LOADING_SELECTORS } from './features/loading';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const selectedTodo = useSelector(TODO_SELECTORS.getCurrentTodo);
  const isTodosLoading = useSelector(LOADING_SELECTORS.getTodosLoadingStatus);

  const setIsTodosLoading = (status: boolean) => {
    dispatch(LOADING_ACTIONS.setTodosLoading(status));
  };

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then(res => dispatch(TODOS_ACTIONS.setTodos(res)))
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
              {isTodosLoading ? (<Loader />) : (<TodoList />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (<TodoModal />)}
    </>
  );
};
