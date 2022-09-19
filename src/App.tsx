import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { actions as TodosAction } from './features/todos';
import { filteredTodosSelector } from './app/selectors';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(filteredTodosSelector);
  const currentTodo = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todosFromServer) => {
        dispatch(TodosAction.setTodos(todosFromServer));
      })
      .finally(() => setIsLoading(false));
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
              {isLoading
                ? (<Loader />)
                : (<TodoList todos={filteredTodos} />)}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && (<TodoModal />)}
    </>
  );
};
