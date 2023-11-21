/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

const getValidStr = (str: string) => {
  return str.trim().toLowerCase();
};

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, currentTodo, filter } = useAppSelector(store => store);
  const [isLoad, setIsLoad] = useState(true);

  const filtredTodos = () => {
    const { status, query } = filter;

    if (status === Status.All && !getValidStr(query)) {
      return todos;
    }

    return todos.filter(todo => {
      const isTextMatch = getValidStr(todo.title).includes(getValidStr(query));

      if (status === Status.Active) {
        return !todo.completed && isTextMatch;
      }

      if (status === Status.Completed) {
        return todo.completed && isTextMatch;
      }

      return isTextMatch;
    });
  };

  useEffect(() => {
    (async () => {
      setIsLoad(true);
      try {
        const fetchedTodos = await getTodos();

        dispatch(todosActions.setTodos(fetchedTodos));
      } finally {
        setIsLoad(false);
      }
    })();
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
              {isLoad ? <Loader /> : <TodoList todos={filtredTodos()} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
