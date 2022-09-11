/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { RootState } from './app/store';
import { todosActions } from './features/todos';

const preparedTodos = ((state: RootState) => {
  const { todos } = state;
  const { query, status } = state.filter;

  return todos.filter(todo => {
    const { title, completed } = todo;
    const filterWithQuery = title.toLowerCase()
      .includes(query.toLowerCase());

    switch (status) {
      case 'active':
        return filterWithQuery && !completed;

      case 'completed':
        return filterWithQuery && completed;

      case 'all':
        return filterWithQuery;

      default:
        return filterWithQuery;
    }
  });
});

export const App: React.FC = () => {
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const dispatch = useAppDispatch();

  const currentTodo = useSelector((state: RootState) => {
    return state.currentTodo;
  });
  const filteredTodos = useAppSelector(preparedTodos);

  useEffect(() => {
    setIsTodoLoading(true);

    getTodos()
      .then((todosFromServer) => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .finally(() => setIsTodoLoading(false));
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
              {isTodoLoading
                ? (<Loader />)
                : (<TodoList todos={filteredTodos} />)}
            </div>
          </div>
        </div>
      </div>

      {currentTodo
        && <TodoModal />}
    </>
  );
};
