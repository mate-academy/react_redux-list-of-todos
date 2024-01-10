/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleLoadTodos = useCallback(() => {
    setLoader(true);
    getTodos()
      .then((todosFromServer:Todo[]) => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .finally(() => {
        setLoader(false);
      });
  }, [dispatch]);

  useEffect(() => {
    handleLoadTodos();
  }, [handleLoadTodos]);

  const todosFilter = useAppSelector(state => state.filter);

  const visibleTodos = () => {
    let visTodos = todos;

    if (todosFilter.query.length !== 0) {
      visTodos = visTodos.filter((todo:Todo) => todo.title.toLowerCase().includes(todosFilter.query.toLowerCase()));
    }

    if (todosFilter.filter === 'completed') {
      visTodos = visTodos.filter(todo => todo.completed);
    }

    if (todosFilter.filter === 'active') {
      visTodos = visTodos.filter(todo => !todo.completed);
    }

    return visTodos;
  };

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
              {loader
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos()}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
