/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';

enum TodosStatus {
  PENDING = 'pending',
  RESOLVE = 'resolve',
}

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTodo } = useAppSelector(state => state);
  const [todosStatus, setTodosStatus] = useState<TodosStatus>(TodosStatus.PENDING);

  const renderTodoList = () => {
    switch (todosStatus) {
      case TodosStatus.RESOLVE:
        return <TodoList />;

      default:
        return <Loader />;
    }
  };

  useEffect(() => {
    getTodos()
      .then((todos) => dispatch(actions.set(todos)))
      .finally(() => setTodosStatus(TodosStatus.RESOLVE));
  }, [dispatch]);

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
              {renderTodoList()}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
